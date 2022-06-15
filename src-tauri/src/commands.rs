use tauri::{command};
use std::fs;
use std::process;

fn is_file_supported(str_dir: String) -> bool {
    // TODO: Optimise, surely a better way to do this? Would be nice to have `supported_exts` as a global static somehow too.
    let supported_exts: Vec<&str> = vec!["jpg", "jpeg", "png"];
    let mut spliced_ext: Vec<&str> = str_dir.split(".").collect();
    if spliced_ext.is_empty() {
        return false;
    }
    let str_ext = spliced_ext.pop().unwrap();
    return supported_exts.contains(&str_ext);
}

#[command]
pub fn fetch_wallpaper_paths(str_dir: String) -> Result<Vec<String>, String> {
    // Fetch all file paths that exist in the wallpaper directory
    let paths = fs::read_dir(str_dir).unwrap();
    // Map each file path into a String vector
    let dir_vec: Vec<String> = paths.map(|path| path.unwrap().path().display().to_string()).collect();
    // Filter into supported extensions only
    let validated_dir_vec: Vec<String> = dir_vec.iter().filter(|dir| is_file_supported(dir.to_string())).cloned().collect();
    // Send it off to the renderer!
    (!validated_dir_vec.is_empty())
        .then(|| validated_dir_vec)
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