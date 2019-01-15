/* eslint-disable no-undef */
const assert = require('assert');
const filterTrackName = require('../lib/utils/filterTrackName');

describe('util#filterTrackName tests', () => {
	const YOUTUBE_TEST_DATA = [{
		description: 'should do nothing with clean string',
		source: 'Track Title',
		expected: 'Track Title',
	}, {
		description: 'should trim whitespaces',
		source: '  Track Title  ',
		expected: 'Track Title',
	}, {
		description: 'should trim leading whitespaces',
		source: '    Track Title',
		expected: 'Track Title',
	}, {
		description: 'should trim trailing whitespaces',
		source: 'Track Title    ',
		expected: 'Track Title',
	}, {
		description: 'should remove leftovers after e.g. (official video)',
		source: 'Track Title (    )',
		expected: 'Track Title',
	}, {
		description: 'should remove empty leftovers after e.g. (official video)',
		source: 'Track Title ()',
		expected: 'Track Title',
	}, {
		description: 'should remove "HD" string',
		source: 'Track Title HD',
		expected: 'Track Title',
	}, {
		description: 'should remove "HQ" string',
		source: 'Track Title HQ',
		expected: 'Track Title',
	}, {
		description: 'should extract title from single quotes',
		source: '\'Track Title\'',
		expected: 'Track Title',
	}, {
		description: 'should extract title from double quotes',
		source: '"Track Title" whatever',
		expected: 'Track Title',
	}, {
		description: 'should remove .avi extension',
		source: 'Track Title.avi',
		expected: 'Track Title',
	}, {
		description: 'should remove .wmv extension',
		source: 'Track Title.wmv',
		expected: 'Track Title',
	}, {
		description: 'should remove .mpg extension',
		source: 'Track Title.mpg',
		expected: 'Track Title',
	}, {
		description: 'should remove .flv extension',
		source: 'Track Title.flv',
		expected: 'Track Title',
	}, {
		description: 'should remove .mpeg extension',
		source: 'Track Title.mpeg',
		expected: 'Track Title',
	}, {
		description: 'should remove "**NEW**" string',
		source: 'Track Title **NEW**',
		expected: 'Track Title',
	}, {
		description: 'should remove "[whatever]" string',
		source: 'Track Title [Official Video]',
		expected: 'Track Title',
	}, {
		description: 'should remove "Video" string',
		source: 'Track Title Video',
		expected: 'Track Title',
	}, {
		description: 'should remove "Music Video" string',
		source: 'Track Title Music Video',
		expected: 'Track Title',
	}, {
		description: 'should remove "Official Video" string',
		source: 'Track Title Official Video',
		expected: 'Track Title',
	}, {
		description: 'should remove "Official Music Video" string',
		source: 'Track Title Official Music Video',
		expected: 'Track Title',
	}, {
		description: 'should remove "Audio" string',
		source: 'Track Title Audio',
		expected: 'Track Title',
	}, {
		description: 'should remove "Music Audio" string',
		source: 'Track Title Music Audio',
		expected: 'Track Title',
	}, {
		description: 'should remove "Official Audio" string',
		source: 'Track Title Official Audio',
		expected: 'Track Title',
	}, {
		description: 'should remove "Official Music Audio" string',
		source: 'Track Title Official Music Audio',
		expected: 'Track Title',
	}, {
		description: 'should remove "(official)" string',
		source: 'Track Title (Official)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(oficial)" string',
		source: 'Track Title (Oficial)',
		expected: 'Track Title',
	}, {
		description: 'should remove "offizielles Video" string',
		source: 'Track Title offizielles Video',
		expected: 'Track Title',
	}, {
		description: 'should remove "video clip officiel" string',
		source: 'Track Title video clip officiel',
		expected: 'Track Title',
	}, {
		description: 'should remove "video clip" string',
		source: 'Track Title video clip',
		expected: 'Track Title',
	}, {
		description: 'should remove "vid\u00E9o clip" string',
		source: 'Track Title vid\u00E9o clip',
		expected: 'Track Title',
	}, {
		description: 'should remove "(YYYY)" string',
		source: 'Track Title (2348)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(Whatever version)" string',
		source: 'Track Title (Super Cool Version)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(Lyric Video)" string',
		source: 'Track Title (Lyric Video)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(Whatever Lyric Video)" string',
		source: 'Track Title (Official Lyric Video)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(Lyrics Video)" string',
		source: 'Track Title (Lyrics Video)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(Whatever Lyrics Video)" string',
		source: 'Track Title (OFFICIAL LYRICS VIDEO)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(With Lyrics)" string',
		source: 'Track Title (With Lyrics)',
		expected: 'Track Title',
	}, {
		description: 'should remove "(Official Track Stream)" string',
		source: 'Track Title (Official Track Stream)',
		expected: 'Track Title',
	}, {
		description: 'should remove leading colon',
		source: ':Track Title',
		expected: 'Track Title',
	}, {
		description: 'should remove leading semicolon',
		source: ';Track Title',
		expected: 'Track Title',
	}, {
		description: 'should remove leading dash',
		source: '-Track Title',
		expected: 'Track Title',
	}, {
		description: 'should remove leading double quote',
		source: '"Track Title',
		expected: 'Track Title',
	}, {
		description: 'should remove trailing colon',
		source: 'Track Title:',
		expected: 'Track Title',
	}, {
		description: 'should remove trailing semicolon',
		source: 'Track Title;',
		expected: 'Track Title',
	}, {
		description: 'should remove trailing dash',
		source: 'Track Title-',
		expected: 'Track Title',
	}, {
		description: 'should remove trailing double quote',
		source: 'Track Title"',
		expected: 'Track Title',
	}, {
		description: 'should leave single quotes around joined',
		source: 'Track \'n\' Title',
		expected: 'Track \'n\' Title',
	}, {
		description: 'should remove "(whatever 2/12/18)" string',
		source: 'Track Title (whatever 2/12/18)',
		expected: 'Track Title',
	}];

	YOUTUBE_TEST_DATA.forEach(({ description, source, expected }) => {
		it(description, () => {
			assert.equal(filterTrackName(source), expected);
		});
	});
});
