let less = require('less');
let fs = require('fs');
let path = require('path');

module.exports = function(file, server,res){
	let lessStr = fs.readFileSync(file).toString();
	let dir = path.dirname(file);
	let rootPath = server.rootPath;

	less.render(lessStr, {
		paths: [dir, rootPath],
		compress: false,
		javascriptEnabled: true
	})
	.then(function(output) {
		res.send(output.css);
    },
    function(error) {
    	res.send(error);
    });
}