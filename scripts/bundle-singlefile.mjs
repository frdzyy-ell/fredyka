import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

const htmlFile = path.join(distDir, 'index.html');
let html = fs.readFileSync(htmlFile, 'utf-8');

// Find css and js files in dist/assets
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (cssFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  // Replace <link rel="stylesheet" ...> with <style>...</style>
  html = html.replace(/<link rel="stylesheet"[^>]*>/i, `<style>\n${cssContent}\n</style>`);
}

if (jsFile) {
  let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');
  // Replace <script type="module" crossorigin src="..."></script> with inline script
  // Remove module type so it runs cleanly offline under file:/// protocol without CORS restriction
  html = html.replace(/<script type="module"[^>]*><\/script>/i, `<script>\n${jsContent}\n</script>`);
}

const outputFile = path.join(distDir, 'petualangan-sains-offline.html');
fs.writeFileSync(outputFile, html, 'utf-8');
console.log('Successfully created standalone offline file:', outputFile);
