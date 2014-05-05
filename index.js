var connect = require('connect');
var serveStatic = require('serve-static');

module.exports = function(dir){

  var app = connect();
  app.use(function(request,response,next){
    var url = request.url;
    console.log(url);
    if(url == "/current-time"){
      response.end((new Date()).toISOString());
    } else {
      console.log('go next');
      next();
    }
  });
  app.use(serveStatic(dir, {'index': 'default.html'}));

  return app;
}
