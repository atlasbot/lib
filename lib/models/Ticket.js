const mongoose = require('mongoose');

const { snowflake } = require('../mongoParts');

module.exports = new mongoose.Schema({
	guild: {
		...snowflake,
		required: true,
	},
	author: {
		...snowflake,
		required: true,
	},
	channel: {
		...snowflake,
		required: true,
	},
	reason: {
		type: String,
	},
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
});

module.exports.index({
	// THATS A LOT OF ~~DAMAGE~~ INDEXES
	guild: 1,
	channel: 1,
	author: 1,
});
