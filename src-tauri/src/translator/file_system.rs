use std::fs;
use std::path::Path;

use crate::{helpers::file_system::{process,parse_json}, types::TranslationEntry};

#[tauri::command]
#[specta::specta]
pub fn create_translation(
    base_path: String,
    target_language_code: String,
    format: String,
) -> Result<Vec<TranslationEntry>, String> {
     if format != "json" {
          return Err("Only JSON is supported for now".into());
     }
     let base = Path::new(&base_path);
     #[cfg(debug_assertions)]{
          println!("Opening: {}", base.display());
     }
     let parent = base.parent().ok_or("Invalid base language file")?;
     let target_file = parent.join(format!("{}.{}", target_language_code, format));
     let content = fs::read_to_string(base).map_err(|e| e.to_string())?;
     if content.trim().is_empty() {
          return Err("File is empty".into());
     }
     #[cfg(debug_assertions)]{
          println!("File size: {}", content.len());
          println!("First 100 chars: {:?}", &content.chars().take(100).collect::<String>());
     }
     let json = parse_json(&content).map_err(|e| e.to_string())?;
     let mut entries = Vec::new();
     let mut line_number = 1;

     let translated_json = process(
          &json,
          String::new(),
          &mut entries,
          &mut line_number,
     );

     fs::write(
          &target_file,
          serde_json::to_string_pretty(&translated_json).map_err(|e| e.to_string())?,
     )
     .map_err(|e| e.to_string())?;

     Ok(entries)
}