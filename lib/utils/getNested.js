/**
 * Gets a nested value from an object. Keys split at "."
 * @param {Object} obj The object to grab the value from
 * @param {string} key The key the value is at, e.g "foo.bar" for { foo: { bar: 'ayy' }}
 * @param {boolean} [stringOnly=true] Whether returning a string is required
 * @returns {string|void}
 */
module.exports = (obj, key, stringOnly = false) => {
	let val = obj;

	const keys = key.split('.');

	do {
		val = val[keys.shift()];
	} while (val && keys.length);

	if (typeof val === 'string' || !stringOnly) {
		return val;
	}
};
