const emojis = require('emojilib').lib;

module.exports = {
	...emojis,
	get: require('./get'),
	regex: require('./regex'),
};
