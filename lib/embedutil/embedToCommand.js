const embedToChunks = require('./embedToChunks');

module.exports = (str) => {
	const chunks = embedToChunks(str);

	return `a!ae ${chunks.join(' ')}`.trim();
};
