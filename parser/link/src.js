var srcReg = /{%\s*src \s?'(.+)'\s?%}/g;

function srcLink(path,staticPrefix){
    return staticPrefix + (path.charAt(0) == "/" ? "" : "/") + path ;
};

module.exports = function ( tpl , server){
  	return tpl.replace(srcReg, function (){
        return srcLink(arguments[1],server.staticPrefix);
  	});
};