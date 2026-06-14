use std::fs;

use crate::{
    helpers::{detect_xml_format, json, resx, xliff, xml_desktop, xml_android},
    types::{
        enums::{TranslationFormat, XmlFormat},
        structs::{CreateTranslationResult, TranslationEntry, XliffMetadata},
    },
};

#[tauri::command]
#[specta::specta]
pub fn create_translation(
    base_path: String,
    base_lang: String,
    target_lang: String,
    format: TranslationFormat,
) -> Result<CreateTranslationResult, String> {
    match format {
        TranslationFormat::Json => json::create(base_path, target_lang),
        TranslationFormat::Xml => {
            let content = fs::read_to_string(&base_path).map_err(|e|e.to_string())?;
            match detect_xml_format(&content) {
                XmlFormat::Desktop => xml_desktop::create(base_path, target_lang),
                XmlFormat::Android => xml_android::create(base_path, target_lang)
            }
        }
        // TranslationFormat::Po => po::create(base_path, target_lang),
        TranslationFormat::Resx => resx::create(base_path, target_lang),
        TranslationFormat::Xliff => xliff::create(base_path, base_lang, target_lang),
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
            match detect_xml_format(&content) {
                XmlFormat::Desktop => xml_desktop::open(base_path, target_path),
                XmlFormat::Android => xml_android::open(base_path, target_path)
            }
        }
        // TranslationFormat::Po => po::open(base_path, target_path),
        TranslationFormat::Resx => resx::open(base_path, target_path),
        _ => Err("Unsupported format".into()),
    }
}

#[tauri::command]
#[specta::specta(result)]
pub fn save_translation(
    target_path: String,
    entries: Vec<TranslationEntry>,
    format: TranslationFormat,
    base_lang: String,
    target_lang: String,
) -> Result<(), String> {
    match format {
        TranslationFormat::Json => json::save(target_path, entries),
        TranslationFormat::Xml => {
            let content = fs::read_to_string(&target_path).map_err(|e|e.to_string())?;
            match detect_xml_format(&content) {
                XmlFormat::Desktop => xml_desktop::save(target_path, entries),
                XmlFormat::Android => xml_android::save(target_path, entries)
            }
        }
        // TranslationFormat::Po => po::save(target_path, entries),
        TranslationFormat::Resx => resx::save(target_path, entries),
        TranslationFormat::Xliff => xliff::save(target_path, entries, base_lang, target_lang),
        _ => Err("Unsupported format".into()),
    }
}

#[tauri::command]
#[specta::specta]
pub fn get_xliff_meta(path: String) -> Result<XliffMetadata, String> {
    let content = fs::read_to_string(path).map_err(|e| e.to_string())?;
    Ok(xliff::parse_xliff(&content)?.meta)
}

#[tauri::command]
#[specta::specta]
pub fn open_xliff(path: String) -> Result<Vec<TranslationEntry>, String> {
    xliff::open(path)
}