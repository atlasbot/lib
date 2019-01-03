/* eslint-disable no-undef */
const assert = require('assert');

describe('Schema validation', () => {
	it('loads schemas correctly', () => {
		const schemas = require('../lib/schemas');

		for (const name of Object.keys(schemas)) {
			assert.ok(name.endsWith('Schema') === true);
		}
	});
});
