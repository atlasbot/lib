const flat = require('flat');

const map = {
	'footer.text': 'footer',
	'thumbnail.url': 'thumbnail',
	'image.url': 'url',
	'author.name': 'name',
	'author.icon': 'icon',
};

const strip = arg => (typeof arg === 'string' ? arg.split('"').join('\'').trim() : arg);

module.exports = (embed) => {
	const flags = [];

	if (embed.fields) {
		for (let i = 0; i < embed.fields.length; i++) {
			const { name, value } = embed.fields[i];

			if (name && value) {
				flags.push(`--field${i + 1}name="${strip(name)}"`);
				flags.push(`--field${i + 1}value="${strip(value)}"`);
			}
		}
	}

	delete embed.fields;

	for (const key of Object.keys(flat(embed))) {
		const argName = map[key] || key;

		flags.push(`--${argName}="${strip(embed[key])}"`);
	}

	return flags;
};
