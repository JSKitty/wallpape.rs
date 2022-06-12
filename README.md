# wallpape.rs
A simple GUI wallpaper manager written in Rust.

----

## Why?
What's a better way to learn Rust and Tauri, than to spontaneously build a desktop app with them?

This is primarily an **educational** project for both fun and knowledge, however, if further developed it could potentially become a lightweight and powerful wallpaper manager!

## Features (and plans)

*These are in no particular order.*

| State  | Feature |
| ------------- | ------------- |
| ✔️ Complete | View & Select static wallpapers from disk |
| ⏳ Planned | Add 'Slideshow' mode: set your wallpaper on an interval |
| ⏳ Planned | Add 'Schedule' mode: set your wallpaper by local time |
| ⏳ Planned | Add 'Zen' mode: set your wallpaper by random inspirational web images |
| 💡 Idea! | Have a good idea? Make an [issue](https://github.com/JSKitty/wallpape.rs/issues) and perhaps it'll get added! |

## Desktop Support
- ✔️ GNOME.
- ✖️ No other DE is currently supported, **PRs & testers welcome!**

## Contributions

*Note: These instructions are very vague and need some expansion, will be done in free time, otherwise, PRs welcome!*

First off, you'll want **Rust**, **Node/NPM** and **Tauri** installed.

- Clone this repo
- Run `npm i`
- Run `npm run tauri dev`
- Let the magic happen!
- To compile into release-optimised binaries, run `cargo tauri build`
