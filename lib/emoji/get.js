const { find } = require('node-emoji');

const EMOJI_REGEX = require('./regex')();
const emojiJson = require('../emojis.json');
const Fuzzy = require('../structures/Fuzzy');
const compare = require('./compare');

const emojis = Object.entries(emojiJson).map(([name, data]) => ({ name, ...data }));

/**
 * Gets an emoji by name, using fuzzy searching.
 * @param {string} query The query - the emoji itself, a name, etc..
 * @returns {Object} The emoji
 */
module.exports = (query) => {
	let result;

	// ideally we want to get it directly instead of going through 1.3k emojis just to find our match

	// strip anything that isn't A-z, 0-9, -_ - should remove things like : from :eggplant:
	const altName = query.replace(/[^A-z0-9_-]+/g, '');
	const byName = emojiJson[query] || emojiJson[altName];

	if (byName) {
		result = {
			query,
			...byName,
		};
	}

	if (!result) {
		const isEmoji = EMOJI_REGEX.test(query);

		for (const emoji of emojis) {
			if (isEmoji && compare(emoji.char, query)) {
				result = emoji;

				break;
			}

			if (emoji.keywords && emoji.keywords.includes(query)) {
				result = emoji;

				break;
			}
		}

		result = (new Fuzzy(emojis, {
			keys: [
				'name',
				'char',
				'keywords',
			],
		})).search(query);
	}

	if (result) {
		// prefer node-emoji's character as atlas uses node-emoji to standardise everything
		// discord doesn't give us the same "emojis" we use, so comparing them without converting is annoying.

		// i hate emojis
		const { emoji: parsedChar, key } = find(result.char || result.name);

		return {
			...result,
			key,
			parsedChar,
		};
	}
};
