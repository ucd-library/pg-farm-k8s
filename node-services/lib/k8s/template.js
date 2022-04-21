import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.join(__dirname, 'templates');
const templates = {};
const files = fs.readdirSync(templatesDir);

for( let file of files ) {
  templates[file.replace(/\..*/, '')] = handlebars.compile(
    fs.readFileSync(path.join(templatesDir, file), 'utf-8')
  );
}

function render(template, data) {
  data = Object.assign(
    {}, 
    config.k8s.default,
    config.k8s[template] || {}, 
    data
  );
  return templates[template](data);
}

export {render};