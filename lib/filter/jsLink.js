var jsReg = /{%\s*jsLink \s?["](.+)["]\s?%}/g;
var utils = require('../utils');
var fs = require("fs");
var path = require("path");
var config = require('../../config.js');
var date = new Date();
var curTime = date.getTime();

function jsLink(path,staticRoot){
    var timeStamp = '';
    if(path.indexOf('?') > -1){
        timeStamp = '&build_time_stamp=' + curTime;
    }else{
        timeStamp = '?build_time_stamp=' + curTime;
    }
    return '<script src="'+ staticRoot + (path.charAt(0) == "/" ? "" : "/") + path + timeStamp + '"></script>';
};

var hp = function ( tpl , staticRoot){
	
  return tpl.replace(jsReg, function (){
        return jsLink(RegExp.$1,staticRoot);
  });
};

module.exports = hp;