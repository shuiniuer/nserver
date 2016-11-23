var cssReg = /{%\s*cssLink \s?["](.+)["]\s?%}/g;
var utils = require('../utils');
var fs = require("fs");
var path = require("path");
var config = require('../../config.js');
var staticRoot = '';
var date = new Date();
var curTime = date.getTime();

function cssLink(path,staticRoot){
    var timeStamp = '';
    if(path.indexOf('?') > -1){
        timeStamp = '&build_time_stamp=' + curTime;
    }else{
        timeStamp = '?build_time_stamp=' + curTime;
    }
    return '<link type="text/css" rel="stylesheet" href="'+ staticRoot + (path.charAt(0) == "/" ? "" : "/") + path + timeStamp + '">';
}

var hp = function ( tpl ,staticRoot){

  return tpl.replace(cssReg, function (){
        return cssLink(arguments[1],staticRoot);
  });
};

module.exports = hp;