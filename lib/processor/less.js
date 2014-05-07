module.exports = makeLess;
var fs = require('fs');
var path = require('path');
var less = require('less');

function makeLess(root){  
  return function(request,response,next){
      var postfix = path.extname(request.url);
      var address = root + '/' +path.basename(request.url); 
      console.log('xxxx postfix: '+postfix+';address: '+address);
      if('.css' == postfix ){  
	  console.log('xxxx');     
	  fs.exists(address, function(isExist){
		console.log('get address ' + address);
		if(!isExist){	
		   fs.readFile(address.replace('css', 'less'),{},callBackForLess);   
		} else{		  	
		   fs.readFile(address,{},callBack);		
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
	   response.writeHead(200, {'Content-Length':data.length, 'Content-Type': 'text/css; charset=UTF-8'});
	   response.end(data);
      }   
     function callBackForLess(err,data){
	   if(err) {
		response.statusCode = 404;
	 	response.end();
		return;
	    }
	   console.log("xxxx "+address);
	   console.log(data);
	   less.render(data.toString(),callBack);
      }   
  }	   
}
