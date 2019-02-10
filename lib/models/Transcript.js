const mongoose = require('mongoose');

const { snowflake } = require('../mongoParts');

module.exports = new mongoose.Schema({
	guild: {
		...snowflake,
		required: true,
	},
	public: {
		type: Boolean,
		default: true,
	},
	cut: {
		type: Boolean,
		default: false,
	},
	messages: [{
		content: {
			type: String,
			maxlength: 2048,
			required: true,
		},
		embeds: [Object],
		author: {
			...snowflake,
			required: true,
		},
		timestamp: {
			type: Date,
			required: true,
		},
		color: {
			type: Number,
		},
		bot: {
			type: Boolean,
		},
		edited: {
			type: Date,
		},
	}],
}, {
	timestamps: {
		createdAt: 'generatedAt',
	},
});
