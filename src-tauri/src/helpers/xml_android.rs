use quick_xml::{
    Reader, Writer, XmlVersion, events::{BytesEnd, BytesStart, BytesText, Event}
};
use std::{
    collections::{HashMap, HashSet},
    fs,
    path::Path,
};

use crate::{helpers::{open_xml_with_callback, save_xml_with_callback}, types::structs::{CreateTranslationResult, TranslationEntry}};

fn parse_android_xml(content: &str) -> Result<HashMap<String, String>, String> {
     let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
     reader.config_mut().trim_text(true);

     let mut buf = Vec::new();
     let mut map = HashMap::new();

     let mut current_key: Option<String> = None;
     let mut current_value = String::new();
     let mut inside_string = false;

     loop {
          match reader.read_event_into(&mut buf).map_err(|e| e.to_string())? {
               Event::Start(e) if e.name().as_ref() == b"string" => {
                    current_key = None;
                    current_value.clear();
                    inside_string = true;

                    let mut translatable = true;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;
                         let value = attr
                         .decoded_and_normalized_value(XmlVersion::Explicit1_0, reader.decoder())
                         .map_err(|e| e.to_string())?
                         .into_owned();

                         match attr.key.as_ref() {
                              b"name" => current_key = Some(value),
                              b"translatable" if value == "false" => translatable = false,
                              _ => {}
                         }
                    }

                    if !translatable {
                         current_key = None;
                    }
               }

               Event::Empty(e) if e.name().as_ref() == b"string" => {
                    let mut key = None;
                    let mut translatable = true;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;
                         let value = attr
                         .decoded_and_normalized_value(XmlVersion::Explicit1_0, reader.decoder())
                         .map_err(|e| e.to_string())?
                         .into_owned();

                         match attr.key.as_ref() {
                         b"name" => key = Some(value),
                         b"translatable" if value == "false" => translatable = false,
                         _ => {}
                         }
                    }

                    if translatable {
                         if let Some(key) = key {
                         map.insert(key, String::new());
                         }
                    }
               }

               Event::Text(e) if inside_string => {
                    current_value.push_str(&String::from_utf8_lossy(e.as_ref()));
               }

               Event::GeneralRef(e) if inside_string => {
                    current_value.push_str(&format!("&{};", String::from_utf8_lossy(e.as_ref())));
               }

               Event::CData(e) if inside_string => {
                    current_value.push_str(&String::from_utf8_lossy(e.as_ref()));
               }

               Event::End(e) if e.name().as_ref() == b"string" => {
                    inside_string = false;

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

fn upsert_android_xml(content: &str, entries: &[TranslationEntry]) -> Result<String, String> {
     let lookup: HashMap<&str, &str> = entries
          .iter()
          .map(|e| (e.key_name.as_str(), e.translation_string.as_str()))
          .collect();

     let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
     reader.config_mut().trim_text(false);

     let mut writer = Writer::new_with_indent(Vec::new(), b' ', 2);
     let mut buf = Vec::new();

     let mut inside_string = false;
     let mut replacing_string = false;
     let mut current_key: Option<String>;
     let mut existing = HashSet::new();

     loop {
          match reader.read_event_into(&mut buf).map_err(|e| e.to_string())? {
               Event::Start(e) if e.name().as_ref() == b"string" => {
                    inside_string = true;
                    replacing_string = false;
                    current_key = None;

                    let mut translatable = true;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;
                         let value = attr.decoded_and_normalized_value(XmlVersion::Explicit1_0, reader.decoder()).map_err(|e| e.to_string())?.into_owned();

                         match attr.key.as_ref() {
                              b"name" => current_key = Some(value),
                              b"translatable" if value == "false" => translatable = false,
                              _ => {}
                         }
                    }

                    if let Some(key) = &current_key {
                         existing.insert(key.clone());
                    }

                    writer.write_event(Event::Start(e.into_owned())).map_err(|e| e.to_string())?;

                    if translatable {
                         if let Some(key) = &current_key {
                              if let Some(value) = lookup.get(key.as_str()) {
                                   replacing_string = true;
                                   writer.write_event(Event::Text(BytesText::from_escaped(*value))).map_err(|e| e.to_string())?;
                              }
                         }
                    }
               }

               Event::Empty(e) if e.name().as_ref() == b"string" => {
                    let mut key = None;
                    let mut translatable = true;

                    for attr in e.attributes() {
                         let attr = attr.map_err(|e| e.to_string())?;
                         let value = attr
                         .decoded_and_normalized_value(XmlVersion::Explicit1_0, reader.decoder())
                         .map_err(|e| e.to_string())?
                         .into_owned();

                         match attr.key.as_ref() {
                         b"name" => key = Some(value),
                         b"translatable" if value == "false" => translatable = false,
                         _ => {}
                         }
                    }

                    if let Some(key_name) = &key {
                         existing.insert(key_name.clone());
                    }

                    if translatable {
                         if let Some(key_name) = key {
                              if let Some(value) = lookup.get(key_name.as_str()) {
                                   writer.write_event(Event::Start(e.into_owned())).map_err(|e| e.to_string())?;
                                   writer.write_event(Event::Text(BytesText::from_escaped(*value))).map_err(|e| e.to_string())?;
                                   writer.write_event(Event::End(BytesEnd::new("string"))).map_err(|e| e.to_string())?;
                                   buf.clear();
                                   continue;
                              }
                         }
                    }

                    writer.write_event(Event::Empty(e.into_owned())).map_err(|e| e.to_string())?;
               }

               Event::Text(_) | Event::GeneralRef(_) | Event::CData(_) if inside_string && replacing_string => {}

               Event::End(e) if e.name().as_ref() == b"string" => {
                    inside_string = false;
                    replacing_string = false;
                    writer.write_event(Event::End(e.into_owned())).map_err(|e| e.to_string())?;
               }

               Event::End(e) if e.name().as_ref() == b"resources" => {
                    for entry in entries {
                         if existing.contains(entry.key_name.as_str()) {
                         continue;
                         }

                         let mut string = BytesStart::new("string");
                         string.push_attribute(("name", entry.key_name.as_str()));

                         writer.write_event(Event::Text(BytesText::from_escaped("\n  "))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Start(string)).map_err(|e| e.to_string())?;
                         writer.write_event(Event::Text(BytesText::from_escaped(&entry.translation_string))).map_err(|e| e.to_string())?;
                         writer.write_event(Event::End(BytesEnd::new("string"))).map_err(|e| e.to_string())?;
                    }

                    writer.write_event(Event::Text(BytesText::from_escaped("\n"))).map_err(|e| e.to_string())?;
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
     let values_dir = base.parent().ok_or("Invalid base language file")?;
     let res_dir = values_dir.parent().ok_or("Invalid Android resources path")?;

     let target_dir = res_dir.join(format!("values-{}", target_language_code));
     fs::create_dir_all(&target_dir).map_err(|e| e.to_string())?;

     let file_name = base.file_name().ok_or("Invalid Android strings file")?;

     let target_file = target_dir.join(file_name);

     let content = fs::read_to_string(base).map_err(|e| e.to_string())?;
     if content.trim().is_empty() {
          return Err("File is empty".into());
     }

     let base_map = parse_android_xml(&content)?;
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

     fs::write(&target_file, upsert_android_xml(&content, &entries)?).map_err(|e| e.to_string())?;

     Ok(CreateTranslationResult {
          entries,
          target_path: target_file.to_string_lossy().to_string(),
     })
}
pub fn open(base_path: String, target_path: String) -> Result<Vec<TranslationEntry>, String> {
     open_xml_with_callback(
          base_path,
          target_path,
          |c| parse_android_xml(c)
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
          |o| upsert_android_xml(&o.content, &o.entries)
     )
}