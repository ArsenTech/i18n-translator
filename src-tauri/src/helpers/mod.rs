use crate::types::{enums::XmlFormat, structs::TranslationEntry};
use serde_json::{Map, Value};

pub mod json;
pub mod xml_desktop;
pub mod resx;
pub mod xliff;

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