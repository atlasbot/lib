const url = require('url');
const isUri = require('./isUri');

const supported = ['playlist', 'track'];

module.exports = (uri) => {
	if (isUri(uri)) {
		const { pathname } = url.parse(uri);

		const type = supported.find(t => pathname.includes(`/${t}/`));

		if (!type) {
			return;
		}

		const id = pathname.split('/').pop();

		return {
			type,
			id,
		};
	}

	// assume it's a regular spotify:user:spotify:playlist:37i9dQZF1DWWQRwui0ExPn
	const parts = uri.split(':').slice(-2);

	if (supported.includes(parts[0])) {
		return {
			type: parts[0],
			id: parts[1],
		};
	}
};
