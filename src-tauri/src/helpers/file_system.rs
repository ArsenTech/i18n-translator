use serde_json::{Map, Value};
use crate::types::TranslationEntry;
use std::collections::HashMap;

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
                    result.insert(
                         key.clone(),
                         process(
                              value,
                              full_key,
                              entries,
                              line_number,
                         ),
                    );
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

pub fn parse_json(content: &str) -> Result<Value, serde_json::Error> {
     serde_json::from_str(
          content.trim_start_matches('\u{FEFF}')
     )
}

pub fn flatten_json(
     value: &Value,
     prefix: String,
     map: &mut HashMap<String, String>,
) {
     match value {
          Value::Object(obj) => {
               for (key, value) in obj {
                    let full_key = if prefix.is_empty() {
                         key.clone()
                    } else {
                         format!("{}.{}", prefix, key)
                    };

                    flatten_json(value, full_key, map);
               }
          }
          Value::String(text) => {
               map.insert(prefix, text.clone());
          }
          _ => {}
     }
}