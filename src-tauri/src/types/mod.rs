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
