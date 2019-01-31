const isSnowflake = require('./utils/isSnowflake');
const constants = require('./constants');

// mongo validation for discord snowflakes (111372124383428608), not perfect but pretty close.
module.exports.snowflake = {
	type: String,
	validate: {
		validator: id => isSnowflake(id),
		message: '{VALUE} is not a valid snowflake!',
	},
};

module.exports.restrictions = {
	mode: {
		type: String,
		enum: ['blacklist', 'whitelist'],
		default: 'blacklist',
		required: true,
	},
	roles: [module.exports.snowflake],
	channels: [module.exports.snowflake],
	permissions: [{
		type: String,
		// only allowed "supported" permissions
		enum: [Object.keys(constants.permissions.names)],
	}],
};
