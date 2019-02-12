const flatten = require('flat');

const map = {
	'footer.text': 'footer',
	'thumbnail.url': 'thumbnail',
	'image.url': 'image',
	'author.name': 'name',
	'author.icon_url': 'icon',
};

const strip = arg => (typeof arg === 'string' ? arg && arg.split('"').join('\'').trim() : arg);

module.exports = (raw) => {
	const flags = [];
	// stringifying then parsing is a (very inefficient) way to break references
	const embed = JSON.parse(JSON.stringify(raw));

	if (embed.fields) {
		for (let i = 0; i < embed.fields.length; i++) {
			const { name, value, inline } = embed.fields[i];

			if (typeof name === 'string' && typeof value === 'string') {
				const strippedName = strip(name);
				const strippedValue = strip(value);

				if (!strippedName || !strippedValue) {
					continue;
				}

				flags.push(`--field${i + 1}name="${strip(name)}"`);
				flags.push(`--field${i + 1}value="${strip(value)}"`);

				if (inline) {
					flags.push(`--field${i + 1}inline`);
				}
			}
		}
	}

	delete embed.fields;

	const flat = flatten(embed);

	for (const key of Object.keys(flat).filter(k => flat[k])) {
		// flat does some weird stuff with empty objects/objects with all values undefined
		if (typeof flat[key] === 'object') {
			continue;
		}
		// #4f545c is the default discord embed color
		if (key === 'color' && flat[key] === '#4f545c') {
			continue;
		}

		const argName = map[key] || key;
		const stripped = strip(flat[key]);

		if (!stripped) {
			continue;
		}

		flags.push(`--${argName}="${stripped}"`);
	}

	return flags;
};
