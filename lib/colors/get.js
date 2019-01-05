const { colors } = require('../constants');

module.exports = (color) => {
	const result = colors.find(c => c.name.toLowerCase() === color.toLowerCase());

	if (result) {
		return {
			...result,
			decimal: parseInt(result.hex.replace(/#/g, ''), 16),
		};
	}
};
