/* eslint-disable no-undef */
const assert = require('assert');
const spotifyParser = require('../lib/utils/spotifyParser');

describe('util#spotifyParser tests', () => {
	it('should parse a playlist url properly', () => {
		assert.deepStrictEqual(spotifyParser('https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=vu4vlZ70Re65k_7TnK9MIA'), {
			type: 'playlist',
			id: '37i9dQZF1DWWQRwui0ExPn',
		});
	});

	it('should parse a track url properly', () => {
		assert.deepStrictEqual(spotifyParser('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC'), {
			type: 'track',
			id: '4uLU6hMCjMI75M1A2tKUQC',
		});
	});

	it('should parse a spotify uri', () => {
		assert.deepStrictEqual(spotifyParser('spotify:user:spotify:playlist:37i9dQZF1DWWQRwui0ExPn'), {
			type: 'playlist',
			id: '37i9dQZF1DWWQRwui0ExPn',
		});

		assert.deepStrictEqual(spotifyParser('spotify:track:6580cF0l1Q2ACGnFIpZhC7'), {
			type: 'track',
			id: '6580cF0l1Q2ACGnFIpZhC7',
		});
	});

	it('should return nothing for a regular link', () => {
		assert.equal(spotifyParser('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), undefined);
	});
});
