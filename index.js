const fs = require('fs');
const process = require('process');
const nome = process.argv.slice(2)[0];
const link = process.argv.slice(2)[1];

const obj = JSON.parse(fs.readFileSync('./index.html'));
obj[nome] = link;
fs.writeFileSync('./index.html', JSON.stringify(obj));