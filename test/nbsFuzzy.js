const assert = require('assert');
const nbsFuzzy = require('../lib/utils/nbsFuzzy');

describe('utils#nbsFuzzy and fuzzy matcher tests', () => {
	const tests = [{
		title: 'It should prefer the closest match',
		haystack: ['Special Members', 'Members'],
		query: 'members',
		expect: 'Members',
	}, {
		title: 'It should respect minimum match requirements',
		haystack: ['b'],
		query: 'a',
		options: {
			matchPercent: 0.01,
		},
		expect: undefined,
	}, {
		title: 'It should play nice with objects and keys',
		haystack: [{
			id: 'A Username',
		}, {
			id: 'Another Username',
		}],
		keys: ['id'],
		query: 'another usernam',
		expect: {
			id: 'Another Username',
		},
	}];

	for (const { title, haystack, query, expect, options, keys } of tests) {
		it(title, () => {
			assert.deepStrictEqual(nbsFuzzy(haystack, keys, query, options), expect);
		});
	}
});
