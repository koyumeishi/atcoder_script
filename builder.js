const fs = require('fs');

const head =  fs.readFileSync( 'userscript_header.js', {encoding:'utf-8'})
              .replace(/__version__/g, process.argv[2]);

const content = fs.readFileSync( 'test/main.js', {encoding:'utf-8'});

console.log("building version : ", process.argv[2]);

fs.writeFileSync( 'docs/atcoder_custom_standings.user.js', `${head}

${content}`);