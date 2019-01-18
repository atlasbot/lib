const flatten = require('flat');

const map = {
	'footer.text': 'footer',
	'thumbnail.url': 'thumbnail',
	'image.url': 'image',
	'author.name': 'name',
	'author.icon_url': 'icon',
};

const strip = arg => (typeof arg === 'string' ? arg.split('"').join('\'') : arg);

module.exports = (raw) => {
	const flags = [];
	// stringifying then parsing is a (very inefficient) way to break references
	const embed = JSON.parse(JSON.stringify(raw));

	if (embed.fields) {
		for (let i = 0; i < embed.fields.length; i++) {
			const { name, value } = embed.fields[i];

			if (typeof name === 'string' && typeof value === 'string') {
				flags.push(`--field${i + 1}name="${strip(name)}"`);
				flags.push(`--field${i + 1}value="${strip(value)}"`);
			}
		}
	}

	delete embed.fields;

	const flat = flatten(embed);
	for (const key of Object.keys(flat).filter(k => flat[k])) {
		// #4f545c is the default discord embed color
		if (key === 'color' && flat[key] === '#4f545c') {
			continue;
		}

		const argName = map[key] || key;

		flags.push(`--${argName}="${strip(flat[key])}"`);
	}

	return flags;
};
