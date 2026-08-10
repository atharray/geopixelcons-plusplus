'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PACKAGE = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const libraryRequire = JSON.parse(fs.readFileSync(path.join(ROOT, 'library.require.json'), 'utf8'));
const requireUrl = process.env.GPC_LIBRARY_REQUIRE_URL || libraryRequire.url;

if (!requireUrl || !/^https:\/\/cdn\.jsdelivr\.net\/gh\/atharray\/geopixelcons-library@v\d+\.\d+\.\d+\/dist\/geopixelcons-library\.js#sha256-[A-Za-z0-9+/]+={0,2}$/.test(requireUrl)) {
    console.error('ERROR: GPC_LIBRARY_REQUIRE_URL must be an exact jsDelivr tag URL with a sha256 SRI suffix.');
    process.exit(1);
}

const header = fs.readFileSync(path.join(ROOT, 'src', 'header.template.js'), 'utf8')
    .replaceAll('__VERSION__', PACKAGE.version)
    .replace('__LIBRARY_REQUIRE_URL__', requireUrl);
const shell = fs.readFileSync(path.join(ROOT, 'src', 'shell.js'), 'utf8')
    .replaceAll('__VERSION__', PACKAGE.version);
const output = `${header.trimEnd()}\n\n${shell.trimEnd()}\n`;
const outputPath = path.join(ROOT, 'dist', `${PACKAGE.version}.user.js`);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Built: ${path.relative(ROOT, outputPath)} (${Buffer.byteLength(output)} bytes)`);
