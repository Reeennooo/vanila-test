const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// 1. Скомпилировать SCSS
execSync("sass src/scss/main.scss dist/css/main.css --no-source-map", { stdio: "inherit" });

// 2. Создать папки
fs.mkdirSync("dist/js/components", { recursive: true });
fs.mkdirSync("dist/js/blocks", { recursive: true });
fs.mkdirSync("dist/js/utils", { recursive: true });
fs.mkdirSync("dist/assets/images", { recursive: true }); // для картинок

// 3. Копировать JS
fs.copyFileSync("src/js/main.js", "dist/js/main.js");

function safeReadDir(src) {
  try { return fs.readdirSync(src); }
  catch (e) { return []; }
}

safeReadDir("src/js/components").forEach(file => {
  fs.copyFileSync(path.join("src/js/components", file), path.join("dist/js/components", file));
});
safeReadDir("src/js/blocks").forEach(file => {
  fs.copyFileSync(path.join("src/js/blocks", file), path.join("dist/js/blocks", file));
});
safeReadDir("src/js/utils").forEach(file => {
  fs.copyFileSync(path.join("src/js/utils", file), path.join("dist/js/utils", file));
});
if (fs.existsSync("src/js/mock.js")) {
  fs.copyFileSync("src/js/mock.js", "dist/js/mock.js");
}

// 4. Копировать картинки (рекурсивно)
function copyFolderSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
copyFolderSync("src/assets/images", "dist/assets/images");

// 5. Заменить пути в HTML
let html = fs.readFileSync("index.html", "utf-8");

// CSS и JS
html = html
  .replace(/src\/css\/main.css/g, "css/main.css")
  .replace(/src\/js\/main.js/g, "js/main.js");

// Картинки (в теге <img src="..."> и т.п.)
html = html.replace(/\/?src\/assets\/images\//g, "assets/images/");

fs.writeFileSync("dist/index.html", html);

// 6. ----- NEW ----- Заменить пути к картинкам внутри JS-файлов в dist/js
// Проходим рекурсивно по dist/js и правим строки внутри файлов
function replaceImagePathsInJS(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(name => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      replaceImagePathsInJS(full);
    } else if (full.endsWith(".js")) {
      let content = fs.readFileSync(full, "utf-8");

      // 1) Заменяем "/src/assets/images/..." или "src/assets/images/..." на "assets/images/..."
      content = content.replace(/(["'`])\/?src\/assets\/images\//g, "$1assets/images/");

      // 2) На всякий случай: если где-то оставались абсолютные пути с ведущим слэшем в других местах
      content = content.replace(/\/src\/assets\/images\//g, "assets/images/");

      fs.writeFileSync(full, content, "utf-8");
    }
  });
}
replaceImagePathsInJS("dist/js");