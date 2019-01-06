const mongoose = require('mongoose');

require('../schemas/Settings');
require('../schemas/Action');
require('../schemas/Infraction');
require('../schemas/Playlist');
require('../schemas/User');

module.exports = class {
	constructor({
		SettingsHook,
	}) {
		this.SettingsHook = SettingsHook;

		this.Playlist = mongoose.model('Playlist');
		this.Settings = mongoose.model('Settings');
		this.Action = mongoose.model('Action');
		this.Infraction = mongoose.model('Infraction');
		this.User = mongoose.model('User');

		mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		});
	}

	async settings(guild) {
		let settings = await this.Settings.findOne({ id: guild.id || guild });

		if (!settings) {
			const data = typeof guild === 'string' ? { id: guild } : guild;

			settings = await this.Settings.create(data);
		}

		if (this.SettingsHook) {
			return this.SettingsHook(settings);
		}

		return settings;
	}

	async user(user) {
		let profile = await this.User.findOne({ id: user.id || user });

		if (!profile) {
			const data = typeof user === 'string' ? { id: user } : user;

			profile = await this.User.create(data);
		}

		return profile;
	}
};
