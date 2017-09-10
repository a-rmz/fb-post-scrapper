const fs = require('fs');
const pug = require('pug');

const compiledFunction = pug.compileFile('./src/io/templates/report.pug');

const exportHTML = (path, data) => {
  const html = compiledFunction({data: data});
  fs.writeFileSync(path, html);
}

module.exports = exportHTML;
