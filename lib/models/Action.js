const mongoose = require('mongoose');
const discordId = require('../mongoSnowflake');

const ActionSchema = new mongoose.Schema({
	guild: {
		...discordId,
		required: true,
	},
	// action will run with the updatedBy user in context if it's a interval trigger type
	updatedBy: {
		type: String,
		required: true,
	},
	// things to do when the action is executed
	content: [{
		type: {
			type: String,
			enum: ['channel', 'dm'],
		},
		message: {
			type: String,
			required: true,
			maxLength: 2048,
		},
		// if null, assumes the invocation channel. only used if "type" === "channel"
		channel: discordId,
		fallback: {
			type: Boolean,
			default: true,
		},
	}],
	trigger: {
		// label is basically a command, e.g if it were called "help" and this was set to label, you would run it via "a!help"
		// that's the theory atleast
		type: {
			type: mongoose.Mixed,
			enum: ['label', 'keyword', 'reactionAdd', 'reactionRemove', 'interval', 'messageCreate', 'guildMemberAdd', 'guildMemberRemove'],
		},
		content: {
			type: String,
			required: true,
			lowercase: true,
		},
	},
	flags: {
	// How long the output should stay before being deleted
		ttl: {
			type: Number,
			default: 0,
		},
		// The actions cooldown in milliseconds between uses/triggers
		cooldown: {
			type: Number,
			default: 0,
			// max = 5 minutes / 300 seconds / 300000 milliseconds
			max: 300000,
		},
		// Whether or not it's enabled
		enabled: {
			type: Boolean,
			default: true,
		},
		// Whether or not the action is silent
		silent: {
			type: Boolean,
			default: false,
		},
		// if true, the invocation message will be deleted.
		delete: {
			type: Boolean,
			default: false,
		},
		// whether to hide permission related messages (e.g, if a user doesn't have a required role to run the action, atlas won't tell them to piss off, it'll just to nothing)
		quiet: {
			type: Boolean,
			default: false,
		},
	},
	restrictions: {
		mode: {
			type: String,
			enum: ['blacklist', 'whitelist'],
			default: 'blacklist',
		},
		roles: [discordId],
		channels: [discordId],
	},
	// both of these are for intervals
	nextRunAt: {
		type: Date,
		default: Date.now,
	},
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

ActionSchema.index({
	guild: 1,
});

module.exports = mongoose.model('Action', ActionSchema);