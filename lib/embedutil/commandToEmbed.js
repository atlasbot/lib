const parseArgs = require('yargs-parser');
const parse = require('parse-color');
const colors = require('../colors');

module.exports = (str) => {
	const parsedArgs = parseArgs(str, {
		configuration: {
			'parse-numbers': false,
		},
	});

	let color;
	if (parsedArgs.color || parsedArgs.colour) {
		const unparsedColor = parsedArgs.color || parsedArgs.colour;

		color = colors.get(unparsedColor.trim().toLowerCase()) || parse(unparsedColor);

		if (!color.hex) {
			color = null;
		}
	}

	const embed = {
		color: color && parseInt(color.hex.replace(/#/g, ''), 16),
		title: !(parsedArgs.icon && !parsedArgs.name) ? parsedArgs.title : null,
		author: {
			name: parsedArgs.icon && !parsedArgs.name ? parsedArgs.title : parsedArgs.name,
			icon_url: parsedArgs.icon,
		},
		description: parsedArgs.description && parsedArgs.description.replace(/\\n/g, '\n'),
		fields: [],
		image: {
			url: parsedArgs.image,
		},
		thumbnail: {
			url: parsedArgs.thumbnail,
		},
		footer: {
			text: parsedArgs.footer,
		},
		timestamp: parsedArgs.timestamp && new Date(),
		url: parsedArgs.url,
	};

	for (const [name, value] of Object.entries(parsedArgs)) {
		const match = /field([0-9])value/.exec(name);

		if (match) {
			const [, number] = match;

			embed.fields.push({
				name: parsedArgs[`field${number}name`],
				value: value.toString(),
				inline: parsedArgs[`field${number}inline`],
			});
		}
	}

	return embed;
};
