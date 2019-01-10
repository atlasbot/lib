const redis = require('redis');

/* eslint-disable no-console */
module.exports = class {
	/**
	 * Cache constructor - redis options are fetched from environment variables REDIS_HOST, REDIS_PORT and REDIS_PASS
	 * @param {string} prefix The prefix to add to all keys in the cache
	 */
	constructor(prefix = '') {
		this.prefix = prefix;

		this.client = redis.createClient({
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
			// "undefined" stops redis complaining about a password being supplied and the server
			// not needing one when there isn't actually one set in .env
			password: process.env.REDIS_PASS || undefined,
		});
	}

	/**
	 * Get a key value
	 * @param {string} rawKey The key to get the value for
	 * @returns {Promise<*|void>} The value of the key or void if nothing was found
	 */
	get(rawKey) {
		return new Promise((resolve, reject) => {
			const key = `${this.prefix}${rawKey}`;

			this.client.get(key, (err, data) => {
				if (err) {
					return reject(err);
				}

				if (!data) {
					return resolve();
				}

				try {
					return resolve(JSON.parse(data.toString()));
				} catch (e) {
					return reject(e);
				}
			});
		});
	}

	/**
	 * Set a key to a value
	 * @param {string} rawKey The key to set
	 * @param {*} val The value to set <rawKey> to
	 * @param {number} ttl how long, in seconds, that the value stays in redis until it's deleted.
	 * @returns {Promise<void>}
	 */
	async set(rawKey, val, ttl) {
		return new Promise((resolve, reject) => {
			const key = `${this.prefix}${rawKey}`;

			try {
				val = JSON.stringify(val);
			} catch (e) {
				return reject(e);
			}

			const cb = err => (err ? reject(err) : resolve());

			if (isNaN(ttl)) {
				this.client.set(key, val, cb);
			} else {
				this.client.setex(key, ttl, val, cb);
			}
		});
	}

	/**
	 * Delete a key
	 * @param {string} key The key to delete
	 * @returns {Promise<void>}
	 */
	async del(key) {
		return new Promise((resolve, reject) => {
			this.client.del(`${this.prefix}${key}`, (err, res) => (err ? reject(err) : resolve(res)));
		});
	}
};

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
	console.warn('Redis not configured, defaulting to maps.');

	module.exports = class extends Map {
		// prefix isn't needed because it's a map, but if it's forwarded to the map it throws a temper tantrum
		constructor() { // eslint-disable-line no-useless-constructor
			super();
		}

		// cache uses "del", maps have "delete", this just redirects it.
		del(...args) {
			return this.delete(...args);
		}

		// cache has a third "ttl" option in seconds, this adds support for it
		set(key, value, ttl) {
			if (!ttl) {
				return super.set(key, value);
			}

			setTimeout(() => {
				this.del(key);
			}, ttl * 1000);

			return super.set(key, value);
		}
	};
}
