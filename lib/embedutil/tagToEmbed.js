const commandToEmbed = require('./commandToEmbed');

module.exports = (input) => {
	const tag = input.match(/{(.*)}/);

	if (tag) {
		const chunks = tag[1].split(';');

		return commandToEmbed(chunks.join(' '));
	}
};
