use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Type, Deserialize)]
pub struct TranslationEntry {
    pub key_name: String,
    pub base_string: String,
    pub translation_string: String,
    pub line_number: usize,
}

#[derive(Serialize, Type, Deserialize)]
pub struct CreateTranslationResult {
    pub entries: Vec<TranslationEntry>,
    pub target_path: String,
}

#[derive(Serialize, Type, Deserialize)]
pub struct XliffMetadata {
    pub src_lang: String,
    pub trg_lang: String,
}

#[derive(Serialize, Type, Deserialize)]
pub struct ParsedXliff {
    pub meta: XliffMetadata,
    pub entries: Vec<TranslationEntry>,
}

#[derive(Serialize, Deserialize)]
pub struct SaveXmlOptions {
    pub content: String,
    pub entries: Vec<TranslationEntry>,
    pub base_lang: Option<String>,
    pub target_lang: Option<String>,
}
