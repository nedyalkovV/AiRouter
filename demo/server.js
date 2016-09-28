/* jshint esversion: 6 */

var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
const PORT = 8080;

// function handleRequest(request, response){
//     fs.readFile('demo/index.html', function (err, html) {
//         if (err) {
//             throw err;
//         }
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     });
// }
app.set("view options", {layout: false});
app.all('*', function(req, res){
    
});

//Lets start our server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
