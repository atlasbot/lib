const { compareTwoStrings: compare } = require('string-similarity');
const getNested = require('./../utils/getNested');

/** Searches an array for a result using levenshtein's algorithm */
class Fuzzy {
	/**
	 * Setup the fuzzy searcher
	 * @param {Object[]} haystack The array to search
	 * @param {string[]} keys The object keys to use
	 * @param {Object} options The options to use
	 * @param {number} options.matchPercent the required match percent to be a possible valid result
	 */
	constructor(haystack = [], {
		matchPercent = 0.75,
		keys = [],
	} = {}) {
		if (haystack instanceof Map) {
			haystack = Array.from(haystack.values());
		}

		if (!haystack || !(haystack instanceof Array)) {
			throw new Error('We need an array containing the search list');
		}

		this.haystack = haystack;
		this.keys = keys;
		this.matchPercent = matchPercent;
	}

	/**
	 * Execute the fuzzy search
	 * @param {string} [query=void] The query to search for
	 * @returns {void|Object} The result that was found
	 */
	search(query = '') {
		const processed = [];

		if (!this.haystack || !this.haystack.length || !query) {
			return;
		}

		query = query.toLowerCase();

		for (const item of this.haystack) {
			let values;

			// if there are keys, we want to get them from the object
			if (this.keys && this.keys.length) {
				values = this.keys.map(k => getNested(item, k));
			} else {
				// otherwise assume it's a string
				values = [item];
			}

			for (const string of values.filter(x => x).map(x => x.toString().toLowerCase())) {
				const score = compare(string, query);

				// if it's a perfect match then there is no point in continuing
				if (score === 1) {
					return item;
				}

				processed.push({
					item,
					score,
				});
			}
		}

		// find the item with the best score
		const best = processed.reduce(((prev, curr) => (prev.score > curr.score ? prev : curr)), processed[0]);

		if (best) {
			if (!isNaN(this.matchPercent) && best.score < this.matchPercent) {
				return;
			}

			return best.item;
		}
	}
}

module.exports = Fuzzy;
