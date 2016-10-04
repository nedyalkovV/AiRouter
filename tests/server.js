/* jshint esversion: 6 */

var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
const PORT = 8080;

app.use('/tests', express.static(__dirname + '/tests/'));
app.use('/', (req, res)=>{
    res.redirect('/tests/#/');
});

//Lets start our server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
