const emojis = require('emojilib').lib;
const fs = require('fs');

module.exports = emojis;

fs.readdirSync(__dirname).filter(m => m !== 'index.js').forEach((f) => {
	module.exports[f.split('.').shift()] = require(`./${f}`);
});
