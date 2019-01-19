const commandToEmbed = require('./commandToEmbed');

module.exports = (input) => {
	const re = /{((?:[^;{}]+)(?:advancedembed|ae)[^}]+)}/g;

	const tags = [];

	let m;
	do {
		m = re.exec(input);

		if (m) {
			tags.push(m);
		}
	} while (m);

	return tags.map((match) => {
		const parts = match[1].split(';');

		return commandToEmbed(parts.join(' '));
	});
};
