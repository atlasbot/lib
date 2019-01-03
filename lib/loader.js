const fs = require('fs');
const path = require('path');

module.exports = (dirname, prefix = '') => {
	const ret = {};

	fs.readdirSync(dirname).filter(m => m !== 'index.js').forEach((f) => {
		const module = path.join(dirname, f);

		ret[f.split('.').shift() + prefix] = require(module);

		delete require.cache[require.resolve(module)];
	});

	return ret;
};
