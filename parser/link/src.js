var jsReg = /{%\s*src \s?'(.+)'\s?%}/g;

function jsLink(path,staticPrefix){
    return staticPrefix + (path.charAt(0) == "/" ? "" : "/") + path ;
};

module.exports = function ( tpl , server){
  return tpl.replace(jsReg, function (){
        return jsLink(RegExp.$1,server.staticPrefix);
  });
};