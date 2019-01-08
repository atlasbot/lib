const mongoose = require('mongoose');
const isSnowflake = require('../../lib/utils/isSnowflake');

const GuildSettingsSchema = new mongoose.Schema({
	// the id of the guild
	id: {
		required: true,
		type: String,
		validate: {
			validator: id => isSnowflake(id),
			message: '{VALUE} is not a valid snowflake!',
		},
	},
	// tracked messages
	messages: {
		type: Number,
		default: 0,
	},
	// experience points
	xp: {
		type: Number,
		default: 0,
	},
});

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	discriminator: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	guilds: [GuildSettingsSchema],
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

UserSchema.index({
	id: 1,
});

module.exports = mongoose.model('User', UserSchema);
