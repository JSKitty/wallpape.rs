const tAPI = window.__TAURI__;

// Any DOM cache will be put here for efficient access
const domList = document.getElementById('response');

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
    tAPI.invoke('fetch_wallpaper_paths', { strDir }).then(res => {
        domList.innerHTML = '';
        res.forEach(
            strPath => domList.innerHTML += '<img class="preview_img" src="' + tAPI.tauri.convertFileSrc(strPath) + '" onclick="setWallpaper(\'/' + strPath + '\')">'
        );
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