const tAPI = window.__TAURI__;

// Any DOM cache will be put here for efficient access
const domList = document.getElementById('response');

// General frontend-wide cache
let strWallpaperDir = '';

// Fetch the last wallpaper directory from persistence + refresh cache, if it exists.
const getWallpaperDir = () => strWallpaperDir = localStorage.getItem('wp_dir');
// Set the wallpaper directory in persistence & cache.
const setWallpaperDir = (strDir) => {
    localStorage.setItem('wp_dir', strDir);
    strWallpaperDir = strDir;
}

// Ask the user for a directory of wallpapers
function askForDirectory() {
    tAPI.dialog.open({ directory: true, title: 'Select a wallpaper folder' }).then(res => {
        if (res) fetchDirectories(res);
    }).catch(err => {
        console.log(err);
    });
}

// Fetch Local Wallpapers
function fetchDirectories(strDir) {
    if (!strDir) return;
    tAPI.invoke('fetch_wallpaper_paths', { strDir }).then(res => {
        domList.innerHTML = '';
        res.forEach(
            strPath => domList.innerHTML += '<img class="preview_img" src="' + tAPI.tauri.convertFileSrc(strPath) + '" onclick="setWallpaper(\'/' + strPath + '\')">'
        );
        setWallpaperDir(strDir);
    })
    .catch(err => {
        domList.innerText = `Err(${err})`;
    });
}

// Set Wallpaper
function setWallpaper(strPath) {
    tAPI.invoke('set_wallpaper_path', { strPath }).then(/* Ahh, sweet silence. */)
    .catch(err => {
        domList.innerHTML = 'Failed to set wallpaper!<br>Your Desktop Environment may not be supported yet.';
        console.error(err);
    });
}

// --- INIT: Start the puppy up!
// This'll attempt to load any previous GUI data, and also gracefully handles if missing any data.
fetchDirectories(getWallpaperDir());