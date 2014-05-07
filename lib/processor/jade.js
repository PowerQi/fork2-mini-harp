module.exports = makeJade;
var fs = require('fs');
var path = require('path');
var jade = require('jade');

function makeJade(root){  
  return function(request,response,next){
      var postfix = path.extname(request.url);
      var address = root + '/' +path.basename(request.url); 
      console.log('postfix: '+postfix+';address: '+address);
      if('.html' == postfix ){       
	  fs.exists(address, function(isExist){
		console.log('get address ' + address);
		if(!isExist){		   
		   jade.renderFile(address.replace('html', 'jade'), {}, callBack);
		}else{		  	
		   fs.readFile(address,{'encoding':'utf8'},callBack);		
		}
          });    	
      }else{
	  //response.statusCode = 404;
	  //response.end();
	  next();
       }
      function callBack(err,data){
	   if(err) throw err;
	   console.log('go here ' + data);	   
	   response.writeHead(200, {'Content-Length':data.length, 'Content-Type':'text/html; charset=UTF-8'});	   
	   response.end(data);	   
      }   
  }	   
}
