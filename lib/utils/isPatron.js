const getPatrons = require('./getPatrons');
const Cache = require('../structures/Cache');

const cache = new Cache('isPatron');

module.exports = async (user) => {
	// as a reward for the brutal v8 release, free patron for peoples to the start of feb
	if (Date.now() < 1548979200000) {
		return {
			discord_id: user.id || user,
			amount_cents: 10000,
		};
	}

	// campaign owner isn't actually a patron so \/
	if (user === '111372124383428608') {
		return {
			discord_id: '111372124383428608',
			amount_cents: 10000,
		};
	}

	const existing = await cache.get(user);
	if (existing) {
		return existing;
	}

	const patrons = await getPatrons();

	for (const patron of patrons) {
		// cache all current patrons
		await cache.set(patron.discord_id, patron, 30 * 60);
	}

	const patron = patrons.find(p => p.discord_id === user);

	return patron;
};
