/* eslint-disable no-undef */
const assert = require('assert');
const { utils } = require('../lib');

describe('Util tests', () => {
	it('capitalizes "perth"', () => {
		assert.ok(utils.capitalize('perth') === 'Perth');
	});

	it('cleans a subreddit name', () => {
		assert.equal(utils.cleanSubreddit('/r/askreddit'), 'askreddit');
		assert.equal(utils.cleanSubreddit('r/askreddit'), 'askreddit');
		assert.equal(utils.cleanSubreddit('askreddit'), 'askreddit');
	});

	it('correctly compares maps', () => {
		assert.ok(utils.compareMaps(new Map([['test', 'test']]), new Map([['test', 'test']])) === true);
		assert.ok(utils.compareMaps(new Map([['test', 'test']]), new Map([['test', 'different']])) === false);
	});

	it('recognizes toggle keywords', () => {
		assert.ok(utils.toggleType('disable') === false);
		assert.ok(utils.toggleType('off') === false);
		assert.ok(utils.toggleType('on') === true);
		assert.ok(utils.toggleType('enable') === true);
	});

	it('prettifies milliseconds', () => {
		assert.equal(utils.prettyMs(1.08e+7), '3 hours');
		assert.equal(utils.prettyMs(2.592e+8), '3 days');
		assert.equal(utils.prettyMs(2000), '2 seconds');
		assert.equal(utils.prettyMs(1000), '1 second');
	});

	it('validates a discord snowflake', () => {
		assert.ok(utils.isSnowflake('111372124383428608'));
		assert.ok(utils.isSnowflake('340583394192916492'));
		assert.ok(utils.isSnowflake('338222603829510164'));
		assert.ok(utils.isSnowflake('345177567541723137'));
		assert.ok(utils.isSnowflake('159962941502783488'));
		assert.ok(utils.isSnowflake('123') === undefined);
		assert.ok(utils.isSnowflake('123123098123') === undefined);
		assert.ok(utils.isSnowflake('12312309812352') === undefined);
		assert.ok(utils.isSnowflake('123098123091823091283091823') === undefined);
	});

	it('parses a role colour correctly', () => {
		assert.equal(utils.roleColor(), '4F545C');
		assert.equal(utils.roleColor(9807270), '95A5A6');
	});

	it('parses region names correctly', () => {
		assert.equal(utils.cleanRegion('us-east'), 'US East');
		assert.equal(utils.cleanRegion('vip-us-east'), 'VIP US East');
		assert.equal(utils.cleanRegion('russia'), 'Russia');
		assert.equal(utils.cleanRegion('eu-west'), 'West Europe');
	});

	it('deeply merges an object ( ͡° ͜ʖ ͡°)', () => {
		const a = {
			a: {
				b: 'value',
				c: 'value',
			},
		};

		const b = {
			a: {
				b: 'another value',
				c: 'value',
			},
		};

		const merged = utils.deepMerge(a, b);

		assert.ok(merged.a.b === 'another value' && merged.a.c === 'value');
	});
});
