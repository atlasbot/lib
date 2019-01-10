const constants = require('./constants');
const embedutil = require('./embedutil');
const structs = require('./structures');
const colors = require('./colors');
const utils = require('./utils');
const emoji = require('./emoji');
const xputil = require('./xputil');

const Logger = require('./logger');

module.exports = {
	constants,
	embedutil,
	structs,
	emoji,
	colors,
	utils,
	xputil,
	logger: (override = false) => new Logger(override),
};
