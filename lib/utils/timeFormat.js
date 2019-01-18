/**
 * Formats a date to a human readable time.
 * @param {Date} date The date to format
 * @param {boolean} exact Whether to include minutes/seconds
 * @param {boolean} timezone Whether to include the timezone that the date is in
 * @returns {string}
 */
module.exports = (date, exact, timezone) => {
	const formatter = new Intl.DateTimeFormat('en', {
		month: 'short',
		year: 'numeric',
		day: 'numeric',
		hour: exact ? 'numeric' : undefined,
		minute: exact ? 'numeric' : undefined,
		timeZoneName: undefined,
		hour12: true,
		timeZone: timezone || 'UTC',
	});

	try {
		return formatter.format(date);
	} catch (e) {
		// better to return '???' then to potentially brick a whole site
		return '???';
	}
};
