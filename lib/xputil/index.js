const fs = require('fs');

fs.readdirSync(__dirname).filter(m => m !== 'index.js').forEach((f) => {
	module.exports[f.split('.').shift()] = require(`./${f}`);
});
