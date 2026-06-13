use std::fs;

use crate::{
    helpers::{json, xml_desktop, resx},
    types::{
        enums::TranslationFormat,
        structs::{CreateTranslationResult, TranslationEntry},
    },
};

#[tauri::command]
#[specta::specta]
pub fn create_translation(
    base_path: String,
    target_language_code: String,
    format: TranslationFormat,
) -> Result<CreateTranslationResult, String> {
    match format {
        TranslationFormat::Json => json::create(base_path, target_language_code),
        TranslationFormat::Xml => {
            let content = fs::read_to_string(&base_path).map_err(|e|e.to_string())?;
            if content.contains("<resources") {
                Err("Unsupported format".into())
            } else {
                xml_desktop::create(base_path, target_language_code)
            }
        }
        // TranslationFormat::Po => po::create(base_path, target_language_code),
        TranslationFormat::Resx => resx::create(base_path, target_language_code),
        // TranslationFormat::Xliff => xliff::create(base_path, target_language_code),
        _ => Err("Unsupported format".into()),
    }
}

#[tauri::command]
#[specta::specta]
pub fn open_translation(
    base_path: String,
    target_path: String,
    format: TranslationFormat,
) -> Result<Vec<TranslationEntry>, String> {
    match format {
        TranslationFormat::Json => json::open(base_path, target_path),
        TranslationFormat::Xml => {
            let content = fs::read_to_string(&base_path).map_err(|e|e.to_string())?;
            if content.contains("<resources") {
                Err("Unsupported format".into())
            } else {
                xml_desktop::open(base_path, target_path)
            }
        }
        // TranslationFormat::Po => po::open(base_path, target_path),
        TranslationFormat::Resx => resx::open(base_path, target_path),
        // TranslationFormat::Xliff => xliff::open(base_path, target_path),
        _ => Err("Unsupported format".into()),
    }
}

#[tauri::command]
#[specta::specta(result)]
pub fn save_translation(
    target_path: String,
    entries: Vec<TranslationEntry>,
    format: TranslationFormat,
) -> Result<(), String> {
    match format {
        TranslationFormat::Json => json::save(target_path, entries),
        TranslationFormat::Xml => {
            let content = fs::read_to_string(&target_path).map_err(|e|e.to_string())?;
            if content.contains("<resources") {
                Err("Unsupported format".into())
            } else {
                xml_desktop::save(target_path, entries)
            }
        }
        // TranslationFormat::Po => po::save(target_path, entries),
        TranslationFormat::Resx => resx::save(target_path, entries),
        // TranslationFormat::Xliff => xliff::save(target_path, entries),
        _ => Err("Unsupported format".into()),
    }
}
