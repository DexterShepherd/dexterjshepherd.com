// filter-ignored.js
var split = require('split')
var CLIEngine = require('eslint').CLIEngine
var cli = new CLIEngine({})
const process = require('process')
const execSync = require('child_process').execSync

// process.stdin.setEncoding('utf8');
// process.stdin.pipe(split()).on('data', function (file) {
//     if (!cli.isPathIgnored(file)) console.log(file);
// });
//
//

const parsed = process.argv
  .slice(2)
  .filter(file => !cli.isPathIgnored(file))
  .join(' ')

if (parsed.length) {
  execSync(`./node_modules/eslint/bin/eslint.js --output-file eslint_report.json --format json ${parsed}`, {
    stdio: 'inherit',
    cwd: '.'
  })
}
