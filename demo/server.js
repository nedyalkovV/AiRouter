/* jshint esversion: 6 */

var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
const PORT = 8080;

app.use('/demo', express.static(__dirname + '/demo'));

//Lets start our server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
