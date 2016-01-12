/**
 * server是一个中间件，它根据config.filters连接其它中间件
 */

var connect = require('connect'),
	utils = require('./utils');


module.exports = function(config) {
	config = config || {};

	var app = connect();
	
	config.logger && app.use(connect.logger(config.logger));

	app.use(connect.query());

	app.use(function(req, res, next) {
		req.config = utils.hostConfig(config, req);
		next();	
	});

	config.filters.forEach(function(name) {
		var filter = require('./filter/' + name);
		filter.name = filter.name || name;
		app.use(filter);
	});
	
	return app;
};

