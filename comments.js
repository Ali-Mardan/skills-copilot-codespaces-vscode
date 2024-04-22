// create web server
// create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// create a server
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(__dirname, 'public', pathname);
    fs.stat(filepath, function(err, stats) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<h1>404 Not Found</h1>');
        } else {
            fs.createReadStream(filepath).pipe(response);
        }
    });
}).listen(3000);

console.log('Server running at http://)