use std::{collections::HashMap, fs};

use crate::types::{enums::XmlFormat, structs::{SaveXmlOptions, TranslationEntry}};
use serde_json::{Map, Value};

pub mod json;
pub mod xml_desktop;
pub mod resx;
pub mod xliff;
pub mod xml_android;

pub fn process(
    value: &Value,
    prefix: String,
    entries: &mut Vec<TranslationEntry>,
    line_number: &mut usize,
) -> Value {
    match value {
        Value::Object(map) => {
            let mut result = Map::new();
            for (key, value) in map {
                let full_key = if prefix.is_empty() {
                    key.clone()
                } else {
                    format!("{}.{}", prefix, key)
                };
                result.insert(key.clone(), process(value, full_key, entries, line_number));
            }
            Value::Object(result)
        }
        Value::String(text) => {
            entries.push(TranslationEntry {
                key_name: prefix,
                base_string: text.clone(),
                translation_string: String::new(),
                line_number: *line_number,
            });
            *line_number += 1;
            Value::String(String::new())
        }
        _ => value.clone(),
    }
}

pub fn detect_xml_format(content: &str) -> XmlFormat {
    if content.contains("<resources") {
        XmlFormat::Android
    } else {
        XmlFormat::Desktop
    }
}

pub fn save_xml_with_callback(
    target_path: String,
    entries: Vec<TranslationEntry>,
    base_lang: Option<String>,
    target_lang: Option<String>,
    upsert_callback: impl FnOnce(SaveXmlOptions) -> Result<String, String>,
) -> Result<(), String> {
    if target_path.trim().is_empty() {
        return Err("Target path is missing.".into());
    }
    let original = fs::read_to_string(&target_path).map_err(|e| e.to_string())?;
    let options = SaveXmlOptions {
        content: original,
        entries,
        base_lang,
        target_lang
    };
    fs::write(target_path,upsert_callback(options)?).map_err(|e| e.to_string())?;
    Ok(())
}

pub fn open_xml_with_callback(
    base_path: String,
    target_path: String,
    parse_callback: impl Fn(&String) -> Result<HashMap<String, String>, String>,
) -> Result<Vec<TranslationEntry>, String>{
    let base_content = fs::read_to_string(base_path).map_err(|e| e.to_string())?;
    if base_content.trim().is_empty() {
        return Err("Base file is empty".into());
    }

    let target_content = fs::read_to_string(target_path).map_err(|e| e.to_string())?;
    if target_content.trim().is_empty() {
        return Err("Target file is empty".into());
    }

    let base_map = parse_callback(&base_content)?;
    let target_map = parse_callback(&target_content)?;
    let keys: Vec<_> = base_map.keys().cloned().collect();

    Ok(keys
        .into_iter()
        .enumerate()
        .map(|(index, key)| TranslationEntry {
            key_name: key.clone(),
            base_string: base_map.get(&key).cloned().unwrap_or_default(),
            translation_string: target_map.get(&key).cloned().unwrap_or_default(),
            line_number: index + 1,
        })
        .collect())
}