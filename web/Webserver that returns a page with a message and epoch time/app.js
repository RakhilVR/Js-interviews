
const http = require('http');
const fs = require('fs')



// Webserver that returns a page with a message and epoch time


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const message = '2nd challenge';
        const epochTime = Math.floor(Date.now() / 1000);
        console.log("mh", epochTime);

        fs.readFile('index.html', 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            const currentTime = new Date().toLocaleString();

            const modifiedContent = content
                .replace('__MESSAGE__', message)
                .replace('__EPOCH_TIME__', epochTime)
                .replace('__BROWSER_TIME_HERE__', currentTime);

            console.log(modifiedContent);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(modifiedContent);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});


server.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');