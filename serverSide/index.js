////////////////// Server
const http = require('node:http');

const server = http.createServer((req, res) => {
    res.end("Hello from the server side");
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listenin on port 8000');
});