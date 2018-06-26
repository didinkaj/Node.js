let http = require('http');
let importModule = require('./moduleExample.js');
let fs = require('fs');
let url = require('url');
let index;
var logger = fs.createWriteStream('errorlog.txt', {
    flags: 'a'
})

// loading default index file
fs.readFile('./index.html', (err, data) => {

    if (err) {
        throw err;
    }

    index = data;


})

//server section
http.createServer(function(req, res) {

    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
        if (err) {

            logger.write('page not fount at ' + importModule.mathAdd() + '\r\n');

            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(index);
            return res.end("404 Not Found");

        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });

}).listen(3002);