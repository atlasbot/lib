/* eslint-disable no-undef */
const assert = require('assert');

describe('Load test', () => {
	it('loads', (done) => {
		const lib = require('../lib');

		assert.ok(typeof lib === 'object');

		done();
	});
});
