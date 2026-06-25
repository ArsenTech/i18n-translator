mod helpers;
mod translator;
mod types;

use tauri_specta::{collect_commands, Builder};

use crate::translator::file_system::{
    create_translation, get_xliff_meta, open_translation, open_xliff, save_translation, detect_format
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let specta_builder = Builder::<tauri::Wry>::new().commands(collect_commands![
        create_translation,
        open_translation,
        save_translation,
        get_xliff_meta,
        open_xliff,
        detect_format
    ]);
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(specta_builder.invoke_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
