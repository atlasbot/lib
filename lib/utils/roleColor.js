/**
 * Formats a Discord role color to a hex value (without the #)
 * @param {number} color The hexadecimal color code
 * @returns {string} the hex color code for the role. If no color is set, it'll default to the default role color.
 */
module.exports = (color) => {
	if (!color) {
		return '4F545C';
	}

	return color.toString(16).toUpperCase().padStart(6, '0');
};
