use quick_xml::{
    events::{BytesDecl, BytesEnd, BytesStart, BytesText, Event},
    Reader, Writer,
};
use std::{
    collections::{BTreeMap, HashMap},
    fs,
    path::Path,
};

use crate::types::structs::{CreateTranslationResult, TranslationEntry};

enum XmlNode {
    Text(String),
    Children(BTreeMap<String, XmlNode>),
}

fn parse_xml(content: &str) -> Result<HashMap<String, String>, String> {
    let mut reader = Reader::from_str(content.trim_start_matches('\u{FEFF}'));
    reader.config_mut().trim_text(true);

    let mut buf = Vec::new();
    let mut stack: Vec<String> = Vec::new();
    let mut map = HashMap::new();

    loop {
        match reader
            .read_event_into(&mut buf)
            .map_err(|e| e.to_string())?
        {
            Event::Start(e) => {
                let name = String::from_utf8_lossy(e.name().as_ref()).to_string();

                // Ignore root <Language>
                if !(stack.is_empty() && name == "Language") {
                    stack.push(name);
                }
            }
            Event::Empty(e) => {
                let name = String::from_utf8_lossy(e.name().as_ref()).to_string();

                if !(stack.is_empty() && name == "Language") {
                    let mut key_parts = stack.clone();
                    key_parts.push(name);
                    map.insert(key_parts.join("."), String::new());
                }
            }
            Event::Text(e) => {
                if !stack.is_empty() {
                    let text = e.xml10_content().map_err(|e| e.to_string())?.to_string();

                    if !text.is_empty() {
                        map.insert(stack.join("."), text);
                    }
                }
            }
            Event::CData(e) => {
                if !stack.is_empty() {
                    let text = String::from_utf8_lossy(e.as_ref()).to_string();
                    map.insert(stack.join("."), text);
                }
            }
            Event::End(e) => {
                let name = String::from_utf8_lossy(e.name().as_ref()).to_string();

                if !(stack.is_empty() && name == "Language") {
                    stack.pop();
                }
            }
            Event::Eof => break,
            _ => {}
        }

        buf.clear();
    }

    Ok(map)
}

fn insert_node(root: &mut BTreeMap<String, XmlNode>, parts: &[&str], value: String) {
    if parts.len() == 1 {
        root.insert(parts[0].to_string(), XmlNode::Text(value));
        return;
    }

    let entry = root
        .entry(parts[0].to_string())
        .or_insert_with(|| XmlNode::Children(BTreeMap::new()));

    if let XmlNode::Children(children) = entry {
        insert_node(children, &parts[1..], value);
    }
}

fn write_node(writer: &mut Writer<Vec<u8>>, name: &str, node: &XmlNode) -> Result<(), String> {
    match node {
        XmlNode::Text(text) => {
            if text.is_empty() {
                writer.write_event(Event::Empty(BytesStart::new(name))).map_err(|e| e.to_string())?;
            } else {
                writer.write_event(Event::Start(BytesStart::new(name))).map_err(|e| e.to_string())?;
                writer.write_event(Event::Text(BytesText::new(text))).map_err(|e| e.to_string())?;
                writer.write_event(Event::End(BytesEnd::new(name))).map_err(|e| e.to_string())?;
            }
        }
        XmlNode::Children(children) => {
            writer.write_event(Event::Start(BytesStart::new(name))).map_err(|e| e.to_string())?;
            for (child_name, child_node) in children {
                write_node(writer, child_name, child_node)?;
            }
            writer.write_event(Event::End(BytesEnd::new(name))).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

fn build_xml(entries: &[TranslationEntry]) -> Result<String, String> {
    let mut root = BTreeMap::new();

    for entry in entries {
        let parts: Vec<&str> = entry.key_name.split('.').collect();
        insert_node(&mut root, &parts, entry.translation_string.clone());
    }

    let mut writer = Writer::new_with_indent(Vec::new(), b' ', 4);
    writer.write_event(Event::Decl(BytesDecl::new("1.0", Some("utf-8"), None))).map_err(|e| e.to_string())?;
    writer.write_event(Event::Start(BytesStart::new("Language"))).map_err(|e| e.to_string())?;

    for (name, node) in &root {
        write_node(&mut writer, name, node)?;
    }

    writer.write_event(Event::End(BytesEnd::new("Language"))).map_err(|e| e.to_string())?;
    String::from_utf8(writer.into_inner()).map_err(|e| e.to_string())
}

pub fn create(
    base_path: String,
    target_language_code: String,
) -> Result<CreateTranslationResult, String> {
    let base = Path::new(&base_path);
    let parent = base.parent().ok_or("Invalid base language file")?;
    let target_file = parent.join(format!("{}.xml", target_language_code));

    let content = fs::read_to_string(base).map_err(|e| e.to_string())?;
    if content.trim().is_empty() {
        return Err("File is empty".into());
    }

    let base_map = parse_xml(&content)?;
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

    fs::write(&target_file, build_xml(&entries)?).map_err(|e| e.to_string())?;

    Ok(CreateTranslationResult {
        entries,
        target_path: target_file.to_string_lossy().to_string(),
    })
}

pub fn open(base_path: String, target_path: String) -> Result<Vec<TranslationEntry>, String> {
    let base_content = fs::read_to_string(base_path).map_err(|e| e.to_string())?;
    let target_content = fs::read_to_string(target_path).map_err(|e| e.to_string())?;

    if base_content.trim().is_empty() {
        return Err("Base file is empty".into());
    }

    if target_content.trim().is_empty() {
        return Err("Target file is empty".into());
    }

    let base_map = parse_xml(&base_content)?;
    let target_map = parse_xml(&target_content)?;

    let mut keys: Vec<_> = base_map.keys().cloned().collect();
    keys.sort();

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

pub fn save(target_path: String, entries: Vec<TranslationEntry>) -> Result<(), String> {
    if target_path.trim().is_empty() {
        return Err("Target path is missing.".into());
    }
    fs::write(target_path, build_xml(&entries)?).map_err(|e| e.to_string())?;
    Ok(())
}
