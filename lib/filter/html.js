var utils = require('../utils');

var fs = require("fs");
var path = require("path");

var config = require('../../config');

var jsLink = require('./jsLink');
var cssLink = require('./cssLink');

var re = /{%\s*include \s?["'](.+)["']\s?%}/g;

var hp = function ( tpl , req ){
    var htmlParseRoot = config.htmlParseRoot;
    var dir = '';
    if(typeof req !== 'undefined'){
        dir = htmlParseRoot[req.headers.host] + '/html/';
    }

    return tpl.replace(re, function (){
          var tpl_dir_name = path.normalize(dir + RegExp.$1);
          if( fs.existsSync(tpl_dir_name) ){
              var $d = fs.readFileSync(tpl_dir_name).toString();
              if( $d.search(re) ){
                  return hp($d , req);
              } else {
                  return $d;
              }
          } else {
              return "<h1 style='color:red; font-size:20px;'>模版:" + tpl_dir_name +",不存在</h1>";
          }
      });
};

module.exports = function (req, res, next){
  utils.filter(req, res, next, 'html', function(data) {
      var staticRoot = config.staticPrefix[req.headers.host];
      var tpl = hp(data.toString() , req);
      tpl = cssLink(tpl,staticRoot);
      tpl = jsLink(tpl,staticRoot);
      utils.outputResponse(res, 'text/html', tpl);
  });
};