#[derive(serde::Serialize, specta::Type)]
pub struct TranslationEntry {
    pub key_name: String,
    pub base_string: String,
    pub translation_string: String,
    pub line_number: usize,
}