use tauri::{command};
use std::fs;
use std::process;

#[command]
pub fn fetch_wallpaper_paths(str_dir: String) -> Result<Vec<String>, String> {
    // Fetch all file paths that exist in the wallpaper directory
    let paths = fs::read_dir(str_dir).unwrap();
    // Map each file path into a String vector
    let dir_vec: Vec<String> = paths.map(|path| path.unwrap().path().display().to_string()).collect();
    // Send it off to the renderer!
    (!dir_vec.is_empty())
        .then(|| dir_vec)
        .ok_or("Yikes!".to_string())
}

#[command]
pub fn set_wallpaper_path(str_path: String) -> Result<String, String> {
    // Fire off a GNOME gsettings call and return if success or failure
    return match process::Command::new("gsettings").args(["set", "org.gnome.desktop.background", "picture-uri", str_path.as_str()]).spawn() {
        Ok(_child) => Ok("Done!".to_string()),
        _ => Err("Yikes!".to_string())
    };
}