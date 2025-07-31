const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath;
    let statusCode = 200;

    if (req.url === '/') {
        filePath = path.join(__dirname, 'pages', 'home.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'pages', 'about.html');
    } else {
        filePath = path.join(__dirname, 'pages', 'notfound.html');
        statusCode = 404;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Internal Server Error');
        }

        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

server.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
