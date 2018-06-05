let express = require('express');
let app = express();
let fs = require("fs");
let path = require("path");
let config = require('./config.js');
let htmlParser = require('./parser/html.js');
let lessParser = require('./parser/less.js');
let servers = config.servers;
const REG = /\.git|\.md|\.DS_Store/g;

function filesToLink(files, parent){
	let html = '';
	files.forEach(function(val, key) {
		if(!REG.test(val)){
			let href =  path.join(parent,val);
			html = html + '<a href="'+href+'">'+val+'</a><br/>';
		}
	});
	return html;
}

function handleDir(curPath, req, res){
	fs.readdir(curPath,function(err,files){
		res.send(filesToLink(files, req.path));
	});
}
let typeObj = {
	'.gif': 'image/gif',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.png': 'image/png',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.less': 'text/css'
}
function hanleFile(file, server, res){

	let extname = path.extname(file).toLowerCase();

	if(typeObj[extname]){
		res.set('Content-Type', typeObj[extname]);
	}

	if(extname === '.html'){
		res.send(htmlParser(file, server));
	}else if(extname === '.less'){
		lessParser(file,server,res);
	}else if(extname === '.js' | '.css'){
		res.send(fs.readFileSync(file).toString());
	}else{
		res.sendFile(file);
	}
}

app.get('*', function(req, res) {
	let host = req.headers.host;
	let server = servers.find(function(server){
		return server.domain == host;
	});
	let rootPath = server.rootPath;
	let curPath = rootPath + req.path;

	function nextStep(curPath){
		fs.stat(curPath,function(err,stat){
		    if (err) {
		        res.send('未找到：' + curPath);
		    }else{
		    	if(stat.isFile()){
			    	hanleFile(curPath, server, res);
			    }else if(stat.isDirectory()){
			    	handleDir(curPath, req, res);
			    }else{
			    	res.send('未找到：' + curPath);
			    }
		    }
		});
	}

	if(path.extname(curPath) === '.css'){
		fs.stat(curPath,function(err,stat){
			if(err){
				curPath = path.join(path.dirname(curPath), path.basename(curPath, '.css')+'.less');
			}
			nextStep(curPath);
		});
	}else{
		nextStep(curPath);
	}

});

var server = app.listen(80, function () {
	console.log('服务已启动');
});