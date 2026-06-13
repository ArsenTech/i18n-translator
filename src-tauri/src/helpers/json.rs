use serde_json::{Map, Value};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

use crate::{
    helpers::process,
    types::structs::{CreateTranslationResult, TranslationEntry},
};

fn parse_json(content: &str) -> Result<Value, serde_json::Error> {
    serde_json::from_str(content.trim_start_matches('\u{FEFF}'))
}
fn flatten_json(value: &Value, prefix: String, map: &mut HashMap<String, String>) {
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
fn insert_nested(map: &mut Map<String, Value>, parts: &[&str], value: String) {
    if parts.len() == 1 {
        map.insert(parts[0].to_string(), Value::String(value));
        return;
    }
    let entry = map
        .entry(parts[0].to_string())
        .or_insert_with(|| Value::Object(Map::new()));
    if let Value::Object(obj) = entry {
        insert_nested(obj, &parts[1..], value);
    }
}
fn build_json(entries: &[TranslationEntry]) -> Value {
    let mut root = Map::new();
    for entry in entries {
        let parts: Vec<&str> = entry.key_name.split('.').collect();
        insert_nested(&mut root, &parts, entry.translation_string.clone());
    }
    Value::Object(root)
}

pub fn create(
    base_path: String,
    target_language_code: String,
) -> Result<CreateTranslationResult, String> {
    let base = Path::new(&base_path);
    #[cfg(debug_assertions)]
    {
        println!("Opening: {}", base.display());
    }
    let parent = base.parent().ok_or("Invalid base language file")?;
    let target_file = parent.join(format!("{}.json", target_language_code));
    let content = fs::read_to_string(base).map_err(|e| e.to_string())?;
    if content.trim().is_empty() {
        return Err("File is empty".into());
    }
    #[cfg(debug_assertions)]
    {
        println!("File size: {}", content.len());
        println!(
            "First 100 chars: {:?}",
            &content.chars().take(100).collect::<String>()
        );
    }
    let json = parse_json(&content).map_err(|e| e.to_string())?;
    let mut entries = Vec::new();
    let mut line_number = 1;
    let translated_json = process(&json, String::new(), &mut entries, &mut line_number);

    fs::write(
        &target_file,
        serde_json::to_string_pretty(&translated_json).map_err(|e| e.to_string())?,
    )
    .map_err(|e| e.to_string())?;

    Ok(CreateTranslationResult {
        entries,
        target_path: target_file.to_string_lossy().to_string(),
    })
}

pub fn open(base_path: String, target_path: String) -> Result<Vec<TranslationEntry>, String> {
    let base = Path::new(&base_path);
    let target = Path::new(&target_path);
    #[cfg(debug_assertions)]
    {
        println!("Opening Base: {}", base.display());
        println!("Opening Target: {}", target.display());
    }
    let content_base = fs::read_to_string(base).map_err(|e| e.to_string())?;
    if content_base.trim().is_empty() {
        return Err("Base file is empty".into());
    }
    let content_target = fs::read_to_string(target).map_err(|e| e.to_string())?;
    if content_target.trim().is_empty() {
        return Err("Target file is empty".into());
    }
    #[cfg(debug_assertions)]
    {
        println!("Base file size: {}", content_base.len());
        println!(
            "Base first 100 chars: {:?}",
            &content_base.chars().take(100).collect::<String>()
        );
        println!("Target file size: {}", content_target.len());
        println!(
            "Target first 100 chars: {:?}",
            &content_target.chars().take(100).collect::<String>()
        );
    }
    let json_base = parse_json(&content_base).map_err(|e| e.to_string())?;
    let json_target = parse_json(&content_target).map_err(|e| e.to_string())?;
    let mut base_map = HashMap::new();
    let mut target_map = HashMap::new();

    let mut keys: Vec<_> = base_map.keys().cloned().collect();
    keys.sort();

    flatten_json(&json_base, String::new(), &mut base_map);
    flatten_json(&json_target, String::new(), &mut target_map);

    let mut entries = Vec::new();
    let mut line_number = 1;

    for (key, base_string) in base_map {
        let translation_string = target_map.get(&key).cloned().unwrap_or_default();

        entries.push(TranslationEntry {
            key_name: key,
            base_string,
            translation_string,
            line_number,
        });

        line_number += 1;
    }

    Ok(entries)
}

pub fn save(target_path: String, entries: Vec<TranslationEntry>) -> Result<(), String> {
    if target_path.trim().is_empty() {
        return Err("Target path is missing.".into());
    }

    let json = build_json(&entries);
    fs::write(
        &target_path,
        serde_json::to_string_pretty(&json).map_err(|e| e.to_string())?,
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}
