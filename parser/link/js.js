var jsReg = /{%\s*jsLink \s?["](.+)["]\s?%}/g;
var date = new Date();
var curTime = date.getTime();

function jsLink(path,staticPrefix){
    var timeStamp = '';
    if(path.indexOf('?') > -1){
        timeStamp = '&build_time_stamp=' + curTime;
    }else{
        timeStamp = '?build_time_stamp=' + curTime;
    }
    return '<script src="'+ staticPrefix + (path.charAt(0) == "/" ? "" : "/") + path + timeStamp + '"></script>';
};

module.exports = function ( tpl , server){
  return tpl.replace(jsReg, function (){
        return jsLink(arguments[1],server.staticPrefix);
  });
};