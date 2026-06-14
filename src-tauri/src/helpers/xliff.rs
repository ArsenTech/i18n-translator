use quick_xml::{
    Reader, Writer, XmlVersion, events::{BytesEnd, BytesStart, BytesText, Event}
};
use std::{
    collections::{HashMap, HashSet},
    fs,
    path::Path,
};
use crate::{helpers::save_xml_with_callback, types::structs::{CreateTranslationResult, ParsedXliff, TranslationEntry, XliffMetadata}};

pub fn parse_xliff(content: &str) -> Result<ParsedXliff, String> {
     let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
     reader.config_mut().trim_text(true);

     let mut buf = Vec::new();

     let mut src_lang = String::new();
     let mut trg_lang = String::new();

     let mut current_key: Option<String> = None;
     let mut source = String::new();
     let mut target = String::new();

     let mut inside_source = false;
     let mut inside_target = false;
     let mut entries = Vec::new();
     let mut line_number = 1;

     loop {
          match reader.read_event_into(&mut buf).map_err(|e| e.to_string())? {
               Event::Start(e) if e.name().as_ref() == b"xliff" => {
                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;
                         let value = attr.decoded_and_normalized_value(XmlVersion::Explicit1_0,reader.decoder(),).map_err(|e| e.to_string())?.into_owned();
                         match attr.key.as_ref() {
                              b"srcLang" => src_lang = value,
                              b"trgLang" => trg_lang = value,
                              _ => {}
                         }
                    }
               }
               Event::Start(e) if e.name().as_ref() == b"unit" => {
                    current_key = None;
                    source.clear();
                    target.clear();

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;

                         if attr.key.as_ref() == b"id" {
                              current_key = Some(
                                   attr.decoded_and_normalized_value(
                                        XmlVersion::Explicit1_0,
                                        reader.decoder(),
                                   ).map_err(|e| e.to_string())?.into_owned()
                              );
                         }
                    }
               }
               Event::Start(e) if e.name().as_ref() == b"source" => inside_source = true,
               Event::Start(e) if e.name().as_ref() == b"target" => inside_target = true,
               Event::Text(e) if inside_source => {
                    source.push_str(&String::from_utf8_lossy(e.as_ref()));
               }
               Event::Text(e) if inside_target => {
                    target.push_str(&String::from_utf8_lossy(e.as_ref()));
               }
               Event::GeneralRef(e) if inside_source => {
                    source.push_str(&format!("&{};", String::from_utf8_lossy(e.as_ref())));
               }
               Event::GeneralRef(e) if inside_target => {
                    target.push_str(&format!("&{};", String::from_utf8_lossy(e.as_ref())));
               }
               Event::End(e) if e.name().as_ref() == b"source" => inside_source = false,
               Event::End(e) if e.name().as_ref() == b"target" => inside_target = false,
               Event::End(e) if e.name().as_ref() == b"unit" => {
                    if let Some(key) = current_key.take() {
                         entries.push(TranslationEntry {
                              key_name: key,
                              base_string: source.clone(),
                              translation_string: target.clone(),
                              line_number,
                         });
                         line_number += 1;
                    }
               }
               Event::Eof => break,
               _ => {}
          }
          buf.clear();
     }
     Ok(ParsedXliff {
          meta: XliffMetadata { src_lang, trg_lang },
          entries,
     })
}

fn upsert_xliff(
     content: &str,
     entries: &[TranslationEntry],
     base_lang: &str,
     target_lang: &str,
) -> Result<String, String> {
     let lookup: HashMap<&str, &TranslationEntry> = entries.iter().map(|e| (e.key_name.as_str(), e)).collect();

     let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
     reader.config_mut().trim_text(false);

     let mut writer = Writer::new_with_indent(Vec::new(), b' ', 2);
     let mut buf = Vec::new();

     let mut inside_unit = false;
     let mut inside_segment = false;
     let mut inside_target = false;

     let mut current_key: Option<String> = None;
     let mut existing = HashSet::new();
     let mut saw_target = false;

     loop {
          match reader.read_event_into(&mut buf).map_err(|e| e.to_string())? {
               Event::Start(e) if e.name().as_ref() == b"xliff" => {
                    let mut xliff = BytesStart::new("xliff");

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;

                         match attr.key.as_ref() {
                              b"srcLang" | b"trgLang" => {
                                   // Skip old language attrs
                              }
                              _ => {
                                   xliff.push_attribute((
                                        attr.key.as_ref(),
                                        attr.value.as_ref(),
                                   ));
                              }
                         }
                    }

                    xliff.push_attribute(("srcLang", base_lang));
                    xliff.push_attribute(("trgLang", target_lang));

                    writer.write_event(Event::Start(xliff)).map_err(|e| e.to_string())?;
               }
               Event::Start(e) if e.name().as_ref() == b"unit" => {
                    inside_unit = true;
                    saw_target = false;
                    current_key = None;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;

                         if attr.key.as_ref() == b"id" {
                              current_key = Some(
                                   attr.decoded_and_normalized_value(
                                        XmlVersion::Explicit1_0,
                                        reader.decoder(),
                                   )
                                   .map_err(|e| e.to_string())?
                                   .into_owned(),
                              );
                         }
                    }

                    if let Some(key) = &current_key {
                         existing.insert(key.clone());
                    }

                    writer.write_event(Event::Start(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::Start(e) if inside_unit && e.name().as_ref() == b"segment" => {
                    inside_segment = true;
                    writer.write_event(Event::Start(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::Start(e) if inside_unit && e.name().as_ref() == b"target" => {
                    inside_target = true;
                    saw_target = true;

                    writer.write_event(Event::Start(e.into_owned())).map_err(|e| e.to_string())?;

                    if let Some(key) = &current_key {
                         if let Some(entry) = lookup.get(key.as_str()) {
                         writer.write_event(Event::Text(BytesText::from_escaped(
                              &entry.translation_string,
                         )))
                         .map_err(|e| e.to_string())?;
                         }
                    }
               }
               Event::Text(_) | Event::GeneralRef(_) | Event::CData(_) if inside_target => {
                    // Skip old target content.
               }
               Event::End(e) if inside_target && e.name().as_ref() == b"target" => {
                    inside_target = false;
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::End(e) if inside_segment && e.name().as_ref() == b"segment" => {
                    if !saw_target {
                         let value = current_key.as_deref().and_then(|key| lookup.get(key)).map(|entry| entry.translation_string.as_str()).unwrap_or("");
                         writer.write_event(Event::Start(BytesStart::new("target"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Text(BytesText::from_escaped(value))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("target"))).map_err(|e| e.to_string())?;
                    }
                    inside_segment = false;
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::End(e) if inside_unit && e.name().as_ref() == b"unit" => {
                    inside_unit = false;
                    current_key = None;
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::End(e) if e.name().as_ref() == b"file" => {
                    for entry in entries {
                         if existing.contains(entry.key_name.as_str()) {
                              continue;
                         }
                         let mut unit = BytesStart::new("unit");
                         unit.push_attribute(("id", entry.key_name.as_str()));
                         writer.write_event(Event::Start(unit)).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Start(BytesStart::new("segment"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Start(BytesStart::new("source"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Text(BytesText::from_escaped(&entry.base_string))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("source"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Start(BytesStart::new("target"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Text(BytesText::from_escaped(&entry.translation_string))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("target"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("segment"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("unit"))).map_err(|e| e.to_string())?;
                    }

                    writer.write_event(Event::End(e.into_owned()))
                         .map_err(|e| e.to_string())?;
               }
               Event::Eof => break,
               event => {
                    writer.write_event(event.into_owned()).map_err(|e| e.to_string())?;
               }
          }
          buf.clear();
     }
     String::from_utf8(writer.into_inner()).map_err(|e| e.to_string())
}

pub fn create(
     base_path: String,
     base_lang: String,
     target_lang: String,
) -> Result<CreateTranslationResult, String> {
     let base = Path::new(&base_path);
     let parent = base.parent().ok_or("Invalid XLIFF file")?;
     let target_file = parent.join(format!("{}.xliff", target_lang));

     let content = fs::read_to_string(base).map_err(|e| e.to_string())?;
     if content.trim().is_empty() {
          return Err("XLIFF file is empty".into());
     }

     let parsed = parse_xliff(&content)?;

     let entries: Vec<TranslationEntry> = parsed.entries
          .into_iter()
          .enumerate()
          .map(|(index, entry)| TranslationEntry {
               key_name: entry.key_name,
               base_string: entry.base_string,
               translation_string: String::new(),
               line_number: index + 1,
          })
          .collect();

     fs::write(&target_file, upsert_xliff(&content, &entries, &base_lang, &target_lang)?).map_err(|e| e.to_string())?;
     Ok(CreateTranslationResult {
          entries,
          target_path: target_file.to_string_lossy().to_string(),
     })
}
pub fn open(path: String) -> Result<Vec<TranslationEntry>, String> {
     let content = fs::read_to_string(path).map_err(|e| e.to_string())?;
     if content.trim().is_empty() {
          return Err("XLIFF file is empty".into());
     }
     Ok(parse_xliff(&content)?.entries)
}
pub fn save(
     target_path: String,
     entries: Vec<TranslationEntry>,
     base_lang: String,
     target_lang: String,
) -> Result<(), String> {
     save_xml_with_callback(
          target_path,
          entries,
          Some(base_lang),
          Some(target_lang),
          |o| {
               let base_lang = o.base_lang.ok_or("Base language is missing")?;
               let target_lang = o.target_lang.ok_or("Target language is missing")?;
               upsert_xliff(&o.content, &o.entries, &base_lang, &target_lang)
          }
     )
}