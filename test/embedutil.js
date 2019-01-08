/* eslint-disable no-undef */
const assert = require('assert');
const embedutil = require('../lib/embedutil');

describe('Embed util tests', () => {
	it('Converts an embed to chunks correctly', () => {
		const embed = {
			title: 'test " wew',
		};

		const output = embedutil.embedToChunks(embed);

		assert.deepEqual(output, ['--title="test \' wew"']);
	});

	it('Converts an embed to a tag correctly', () => {
		assert.ok(embedutil.embedToTag({ title: 'test' }) === '{a!ae;--title="test"}');
	});

	it('Converts a tag to a embed', () => {
		// it also has a lot of undefined values that assert.deepEqual doesn't like, and there is no reason to remove them aside from tests and looks
		// just yolo it
		assert.ok(embedutil.tagToEmbed('{a!ae;--title="test"}')[0].title === 'test');
	});

	it('Prefers "ae" tags to regular tags when convering tag > embed', () => {
		assert.ok(embedutil.tagToEmbed('{testtag} {a!ae;--title="test"}')[0].title === 'test');
	});
});
