/**
 * less支持
 */

var Path = require('path'),
	fs = require('fs'),
	util = require('util'),
	utils = require('../utils'),
	iconv = require('iconv-lite');

var autoprefixer = require('autoprefixer-core');
var postcss = require('postcss');

var ERROR_TPL =
	[
		'body:before {',
		'	content: \'{0}\';',
		'	font-size: 40px;',
		'	color: #f00;',
		'}'
	].join('');


module.exports = function(req, res, next) {
	var original_url = req.originalUrl.replace(/\?.*$/, '');
	var root_path = req.config.roots[req.headers.host];
	var path = req.url.replace(/\?.*$/, '');
	var has_get = false;
	// console.log(path);
	for (var i = 0; i < root_path.length; i++) {
		if (!has_get) {
			var temp_path = root_path[i].from;
			if (original_url.search(temp_path) > -1) {
				req.config.root = root_path[i].to;
				path = path.replace(temp_path,'');
				has_get = true;
			}
		}
	}
	// console.log(path);

	var root = req.config.root;

	// console.log('exports:' + path);

	if (root && Path.extname(path) === '.css') {
		path = Path.join(Path.dirname(path), Path.basename(path, '.css') + '.less');

		if (fs.existsSync(Path.join(root, path))) {
			util.debug('less file exist, use less file: ' + path);
			req.url = path.replace(/\\/g, '/');
		}
	}

	// disable cache
	delete req.headers['if-none-match'];
	delete req.headers['if-modified-since'];

	utils.filter(req, res, next, 'less', function(data) {
		processLess(req, res, next, data);
	});

};


function processLess(req, res, next, data) {
	var info = utils.decodeBuffer(data),
		less = info[0],
		encoding = info[1];

	// console.log('in processLess');

	if (ignore(less)) {
		// 如果此less文件有不编译标识
		utils.outputResponse(res, 'text/less', less);
		return;
	}

	parse(less, req, function(css) {
		var buf = iconv.encode(css, encoding);
		var plugin = autoprefixer({
			browsers: ['> 1%', 'last 2 versions']
		});
		postcss([plugin]).process(buf.toString()).then(function(result) {
			result.warnings().forEach(function(warn) {
				console.warn(warn.toString());
			});
			utils.outputResponse(res, 'text/css', result.css);
			tryOutput(req, result.css);
		});
	});
}


function parse(less, req, fn) {
	opts = getOptions(req),
		Parser = require('less').Parser,
		parser = new Parser(opts);

	parser.parse(less, function(ex, tree) {
		var css = '';
		if (!ex) {
			try {
				css = tree.toCSS();
			} catch (e) {
				ex = e;
			}
		}

		if (ex) {
			util.error(ex.message);
			css = getErrorOutput(ex, req);
		}

		fn(css);
	});
}


function getOptions(req) {
	var root = req.config.root || '.',
		dir = Path.dirname(req.filepath);

	// console.log('getOptions:' + dir);

	return utils.extend({
		paths: [dir, root],
		filename: req.filepath
	}, req.config.less);

}

function ignore(source) {
	var sIgnore = '/*!!cmd:lessbuild=false*/';

	if (source.indexOf(sIgnore) !== -1) {
		return true;
	}

	return false;
}

function tryOutput(req, buf) {
	var path = req.filepath;
	if (!path) {
		return;
	}

	path = Path.join(Path.dirname(path), Path.basename(path, '.less') + '.css');

	// console.log('tryOutput:' + path);

	fs.exists(path, function(exists) {
		if (!exists) {
			return;
		}

		util.debug('write css file: ' + path);
		fs.writeFile(path, buf, function(e) {
			e && util.error(e);
		});

	});
}

function getErrorOutput(ex, req) {
	var css = 'Less Compile Error!!!:\n\n' + JSON.stringify(ex);
	return utils.format(ERROR_TPL, [css.replace(/'/g, '').replace(/\s/g, ' ')]);
}

/**
 * 解决less import中文件编码非utf-8问题
 */
(function fix() {
	var importer = require('less').Parser.importer;

	var readFile = fs.readFile;
	fs.readFile = function(pathname, encoding, fn) {
		if (arguments.callee.caller === importer) {
			readFile.call(this, pathname, function(e, data) {
				if (e) {
					return fn(e);
				}

				var o = utils.decodeBuffer(data);
				if (!o) {
					return fn(new Error('decode error'));
				}

				fn(null, o[0]);
			});
		} else {
			return readFile.apply(this, arguments);
		}
	};

})();