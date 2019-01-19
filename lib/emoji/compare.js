const emoji = require('node-emoji');

/**
 * Compare two emojis
 *
 * @param {string} oneRaw The first emoji
 * @param {string} twoRaw the second emoji
 * @returns {boolean} true if they match
 */
module.exports = (oneRaw, twoRaw) => {
	const one = emoji.find(oneRaw);
	const two = emoji.find(twoRaw);

	return one && two && one.emoji === two.emoji;
};

// i wanna die
