const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

/**
 * Parses a number from a string
 * @param {string} str The string to get hte number from
 * @param {number} [def=NaN] the default number to return if none is found
 * @param {string} [strategy='lax'] The strategy to use, "lax" or "strict"
 * @returns {number|void}
 */
module.exports = (str, def = NaN, strategy = 'lax') => {
	const ret = (val) => {
		if (isNaN(val) || val < 0) {
			return def;
		}

		return val;
	};

	if (!str || typeof str !== 'string') {
		return ret();
	}

	if (!/[0-9]/.test(str)) {
		const index = numbers.findIndex(n => n === str.trim().toLowerCase());

		if (index !== -1) {
			return index;
		}
	} else {
		if (strategy === 'strict') {
			return ret(Number(str));
		}

		const text = str.trim().replace(/[^0-9-.]/g, '');

		return ret(Number(text));
	}

	return ret();
};
