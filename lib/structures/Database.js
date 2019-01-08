const mongoose = require('mongoose');

const SettingsSchema = require('../models/Settings');
const ActionSchema = require('../models/Action');
const InfractionSchema = require('../models/Infraction');
const PlaylistSchema = require('../models/Playlist');
const UserSchema = require('../models/User');

module.exports = class {
	constructor({
		SettingsHook,
	} = {}) {
		this.SettingsHook = SettingsHook;

		this.Settings = SettingsSchema;
		this.Action = ActionSchema;
		this.Infraction = InfractionSchema;
		this.Playlist = PlaylistSchema;
		this.User = UserSchema;

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
