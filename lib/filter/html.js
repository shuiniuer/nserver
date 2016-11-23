var utils = require('../utils');

var fs = require("fs");
var path = require("path");

var config = require('../../config');

var jsLink = require('./jsLink');
var cssLink = require('./cssLink');
var src = require('./src');

var re = /{%\s*include \s?[/"/'](.+)[/"/']\s?%}/g;

var hp = function ( tpl , req ){
    var original_url = req.originalUrl.replace(/\?.*$/, '');

    if(path.extname(original_url) === '.html'){
      var root_path = config.roots[req.headers.host];
      var dir = '';

      if(typeof req !== 'undefined'){
          var has_get = false;
          for(var i = 0; i < root_path.length; i++){
            if(!has_get){
              var temp_path = root_path[i].from;
              if(original_url.search(temp_path) > -1){
                dir = root_path[i].to;
                has_get = true;
              }
            }
          }
      }


      return tpl.replace(re, function (){
          var tpl_dir_name = path.normalize(dir + arguments[1]);
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
    }
};

module.exports = function (req, res, next){


  


  utils.filter(req, res, next, 'html', function(data) {
      var original_url = req.originalUrl.replace(/\?.*$/, '');
      var root_path = req.config.roots[req.headers.host];
      var has_get = false;

      var staticRoot ='';

      for (var i = 0; i < root_path.length; i++) {
        if (!has_get) {
          var temp_path = root_path[i].from;
          if (original_url.search(temp_path) > -1) {
            staticRoot = root_path[i].staticPrefix;
            has_get = true;
          }
        }
      }
      
      var tpl = hp(data.toString() , req);
      tpl = cssLink(tpl,staticRoot);
      tpl = jsLink(tpl,staticRoot);
      tpl = src(tpl,staticRoot);
      utils.outputResponse(res, 'text/html', tpl);
  });
};
