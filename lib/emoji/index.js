const emojis = require('emojilib').lib;
const loader = require('../loader');

module.exports = {
	...emojis,
	...loader(__dirname),
};
