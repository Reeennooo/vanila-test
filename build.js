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
fs.readdirSync("src/js/components").forEach(file => {
  fs.copyFileSync(`src/js/components/${file}`, `dist/js/components/${file}`);
});
fs.readdirSync("src/js/blocks").forEach(file => {
  fs.copyFileSync(`src/js/blocks/${file}`, `dist/js/blocks/${file}`);
});
fs.readdirSync("src/js/utils").forEach(file => {
  fs.copyFileSync(`src/js/utils/${file}`, `dist/js/utils/${file}`);
});
fs.copyFileSync(`src/js/mock.js`, `dist/js/mock.js`);

// 4. Копировать картинки
function copyFolderSync(src, dest) {
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

// Картинки
html = html.replace(/src\/assets\/images\//g, "assets/images/");

fs.writeFileSync("dist/index.html", html);