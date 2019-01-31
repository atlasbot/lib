const mongoose = require('mongoose');

const { snowflake } = require('../../mongoParts');

module.exports = new mongoose.Schema({
	level: {
		type: Number,
		maxlength: 150,
		minlength: 0,
		required: true,
	},
	type: {
		type: String,
		required: true,
		enum: ['role'],
	},
	content: snowflake,
});
