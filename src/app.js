const http = require('http');

import dotenv from 'dotenv-safe'
dotenv.config();


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});


console.log(process.env.HOSTNAME);

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
