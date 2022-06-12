#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Import our commands module
mod commands;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::fetch_wallpaper_paths,
            commands::set_wallpaper_path
        ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
