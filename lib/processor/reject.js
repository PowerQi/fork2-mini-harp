var path = require('path');

module.exports = function(request,response,next){
  if ('.jade' == path.extname(request.url) || '.less' == path.extname(request.url)) {
    response.statusCode = 404;
    response.end();
  }else{
     next();
  }
  
}
