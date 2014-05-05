#!/usr/bin/env node
var createTemp = require('../index.js');


var argvs= require('minimist')(process.argv.slice(2));
var dir = argvs.dir || process.cwd();
var port = argvs.port || 4000;
var app = createTemp(dir);
console.log('dir: '+dir+'; port: '+port);

app.listen(port);
