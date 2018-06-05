let fs = require("fs");
let path = require("path");
let config = require('../config');
let cssLink = require('./link/css');
let jsLink = require('./link/js');
let srcLink = require('./link/src');

let REG = /{%\s*include \s?[/"/'](.+)[/"/']\s?%}/g;

var htmlParse = function (tpl_str , rootPath ){
    return tpl_str.replace(REG, function (){
          var tpl_path = path.normalize(rootPath +'/'+ arguments[1]);
          if( fs.existsSync(tpl_path) ){
              var $tpl_str = fs.readFileSync(tpl_path).toString();
              if( $tpl_str.search(REG) ){
                  return htmlParse($tpl_str, rootPath);
              } else {
                  return $tpl_str;
              }
          } else {
              return "<h1 style='color:red; font-size:20px;'>模版:" + tpl_path +",不存在</h1>";
          }
    });
};

module.exports = function(file, server) {
  let tpl = htmlParse(fs.readFileSync(file).toString(),server.rootPath);
  tpl = jsLink(tpl,server);
  tpl = srcLink(tpl,server);
  tpl = cssLink(tpl,server);
  return tpl;
}