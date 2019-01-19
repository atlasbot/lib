const assert = require('assert');

const emoji = require('../lib/emoji');

describe('Emoji tests', () => {
	it('Can get an emoji by name', () => {
		assert.ok(emoji.get('eggplant').char, '🍆');
	});

	it('Can get an emoji by char', () => {
		assert.ok(emoji.get('🍆').name, 'eggplant');
	});

	it('Can get an emoji by keyword', () => {
		assert.ok(emoji.get('aubergine').name, 'eggplant');
	});
});
