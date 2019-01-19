const emojis = require('../emojis.json');

module.exports = {
	...emojis,
	get: require('./get'),
	regex: require('./regex'),
};
