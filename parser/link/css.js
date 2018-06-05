var cssReg = /{%\s*cssLink \s?["](.+)["]\s?%}/g;
var date = new Date();
var curTime = date.getTime();

function cssLink(path,staticPrefix){
    var timeStamp = '';
    if(path.indexOf('?') > -1){
        timeStamp = '&build_time_stamp=' + curTime;
    }else{
        timeStamp = '?build_time_stamp=' + curTime;
    }
    return '<link type="text/css" rel="stylesheet" href="'+ staticPrefix + (path.charAt(0) == "/" ? "" : "/") + path + timeStamp + '">';
}

module.exports = function ( tpl, server){
  return tpl.replace(cssReg, function (){
        return cssLink(arguments[1],server.staticPrefix);
  });
};