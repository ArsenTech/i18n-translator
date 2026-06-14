use quick_xml::{
    Reader, Writer, XmlVersion, events::{BytesEnd, BytesStart, BytesText, Event}
};
use std::{
    collections::{HashMap, HashSet},
    fs,
    path::Path,
};

use crate::{helpers::{open_xml_with_callback, save_xml_with_callback}, types::structs::{CreateTranslationResult, TranslationEntry}};

fn parse_resx(content: &str) -> Result<HashMap<String, String>, String> {
     let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
     reader.config_mut().trim_text(true);

     let mut buf = Vec::new();
     let mut map = HashMap::new();

     let mut current_key: Option<String> = None;
     let mut inside_value = false;
     let mut current_value = String::new();

     loop {
          match reader.read_event_into(&mut buf).map_err(|e| e.to_string())? {
               Event::Start(e) if e.name().as_ref() == b"data" => {
                    current_key = None;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;

                         if attr.key.as_ref() == b"name" {
                              current_key = Some(
                                   attr.decoded_and_normalized_value(XmlVersion::Explicit1_0, reader.decoder())
                                        .map_err(|e| e.to_string())?
                                        .into_owned(),
                              );
                         }
                    }

                    current_value.clear();
               }
               Event::Start(e) if e.name().as_ref() == b"value" => {
                    inside_value = true;
               }
               Event::Text(e) if inside_value => {
                    current_value.push_str(
                         &String::from_utf8_lossy(e.as_ref())
                    );
               }
               Event::GeneralRef(e) if inside_value => {
                    current_value.push_str(
                         &format!("&{};", String::from_utf8_lossy(e.as_ref()))
                    );
               }
               Event::CData(e) if inside_value => {
                    current_value.push_str(
                         &String::from_utf8_lossy(e.as_ref())
                    );
               }
               Event::End(e) if e.name().as_ref() == b"value" => {
                    inside_value = false;
               }
               Event::End(e) if e.name().as_ref() == b"data" => {
                    if let Some(key) = current_key.take() {
                         map.insert(key, current_value.clone());
                    }
               }
               Event::Eof => break,
               _ => {}
          }

          buf.clear();
     }

     Ok(map)
}

fn upsert_resx(content: &str, entries: &[TranslationEntry]) -> Result<String, String> {
     let lookup: HashMap<&str, &str> = entries.iter().map(|e| (e.key_name.as_str(), e.translation_string.as_str())).collect();

     let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
     reader.config_mut().trim_text(false);

     let mut writer = Writer::new_with_indent(
          Vec::new(),
          b' ',
          2,
     );
     let mut buf = Vec::new();

     let mut inside_data = false;
     let mut inside_value = false;
     let mut current_key: Option<String> = None;
     let mut existing = HashSet::new();
     let mut saw_value = false;

     loop {
          match reader.read_event_into(&mut buf).map_err(|e| e.to_string())? {
               Event::Start(e) if e.name().as_ref() == b"data" => {
                    inside_data = true;
                    current_key = None;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;
                         if attr.key.as_ref() == b"name" {
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
               Event::Start(e) if inside_data && e.name().as_ref() == b"value" => {
                    inside_value = true;
                    saw_value = true;
                    writer.write_event(Event::Start(e.into_owned())).map_err(|e| e.to_string())?;

                    if let Some(key) = &current_key {
                         if let Some(value) = lookup.get(key.as_str()) {
                              writer.write_event(Event::Text(BytesText::from_escaped(value.to_string()))).map_err(|e| e.to_string())?;
                         }
                    }
               }
               Event::Text(_) if inside_data && inside_value => {
                    // Skip old translation text because we already wrote the new value.
               }
               Event::End(e) if inside_data && e.name().as_ref() == b"value" => {
                    inside_value = false;
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::End(e) if e.name().as_ref() == b"data" => {
                    if !saw_value {
                         writer.write_event(Event::Start(BytesStart::new("value"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Text(BytesText::from_escaped(
                              lookup.get(current_key.as_deref().unwrap_or("")).unwrap_or(&"").to_string(),
                         ))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("value"))).map_err(|e| e.to_string())?;
                    }
                    inside_data = false;
                    current_key = None;
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
               }
               Event::End(e) if e.name().as_ref() == b"root" => {
                    for entry in entries {
                         if existing.contains(entry.key_name.as_str()) {
                              continue;
                         }

                         let mut data = BytesStart::new("data");
                         data.push_attribute(("name", entry.key_name.as_str()));
                         data.push_attribute(("xml:space", "preserve"));
                         writer.write_event(Event::Text(BytesText::from_escaped("\n  "))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Start(data)).map_err(|e| e.to_string())?;

                         writer.write_event(Event::Start(BytesStart::new("value"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Text(BytesText::from_escaped(&entry.translation_string))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("value"))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("data"))).map_err(|e| e.to_string())?;
                    }
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
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
     target_language_code: String,
) -> Result<CreateTranslationResult, String> {
     let base = Path::new(&base_path);
     let parent = base.parent().ok_or("Invalid base language file")?;
     let target_file = parent.join(format!("{}.resx", target_language_code));

     let content = fs::read_to_string(base).map_err(|e| e.to_string())?;
     if content.trim().is_empty() {
          return Err("File is empty".into());
     }

     let base_map = parse_resx(&content)?;
     let mut keys: Vec<_> = base_map.keys().cloned().collect();
     keys.sort();

     let entries: Vec<TranslationEntry> = keys
          .into_iter()
          .enumerate()
          .map(|(index, key)| TranslationEntry {
               key_name: key.clone(),
               base_string: base_map.get(&key).cloned().unwrap_or_default(),
               translation_string: String::new(),
               line_number: index + 1,
          })
          .collect();

     fs::write(&target_file, upsert_resx(&content, &entries)?).map_err(|e| e.to_string())?;

     Ok(CreateTranslationResult {
          entries,
          target_path: target_file.to_string_lossy().to_string(),
     })
}
pub fn open(base_path: String, target_path: String) -> Result<Vec<TranslationEntry>, String> {
     open_xml_with_callback(
          base_path,
          target_path,
          |c| parse_resx(c)
     )
}
pub fn save(
    target_path: String,
    entries: Vec<TranslationEntry>,
) -> Result<(), String> {
     save_xml_with_callback(
          target_path,
          entries,
          None,
          None,
          |o| upsert_resx(&o.content, &o.entries)
     )
}