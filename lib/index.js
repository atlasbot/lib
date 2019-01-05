const constants = require('./constants');
const embedutil = require('./embedutil');
const structs = require('./structures');
const schemas = require('./schemas');
const colors = require('./colors');
const utils = require('./utils');
const emoji = require('./emoji');
const xputil = require('./xputil');

const Logger = require('./Logger');

module.exports = {
	constants,
	embedutil,
	schemas,
	structs,
	emoji,
	colors,
	utils,
	xputil,
	logger: (override = false) => new Logger(override),
};
