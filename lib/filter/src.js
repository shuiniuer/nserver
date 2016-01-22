var jsReg = /{%\s*src \s?'(.+)'\s?%}/g;
var utils = require('../utils');
var fs = require("fs");
var path = require("path");
var config = require('../../config.js');
var date = new Date();
var curTime = date.getTime();

function jsLink(path,staticRoot){
    
    return staticRoot + (path.charAt(0) == "/" ? "" : "/") + path ;
};

var hp = function ( tpl , staticRoot){
	
  return tpl.replace(jsReg, function (){
        return jsLink(RegExp.$1,staticRoot);
  });
};

module.exports = hp;