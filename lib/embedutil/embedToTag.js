const embedToChunks = require('./embedToChunks');

module.exports = (str) => {
	const chunks = embedToChunks(str);

	if (!chunks.length) {
		return '{a!ae}';
	}

	return `{a!ae;${chunks.join(';')}}`;
};
