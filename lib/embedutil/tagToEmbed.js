const commandToEmbed = require('./commandToEmbed');

const RE_ONE = /{((?:a!|s!)(?:advancedembed|ae).*)}/;
const RE_TWO = /{(.*)}/;

module.exports = (input) => {
	// prefer {a!ae} and it's variants over regular tags
	//  (they could be using a custom server prefix or a new "ae" alias)
	const tag = input.match(RE_ONE) || input.match(RE_TWO);

	if (tag) {
		const chunks = tag[1].split(';');

		return commandToEmbed(chunks.join(' '));
	}
};
