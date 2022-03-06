/* global require,process,console*/

/**
 * Usage:
 * 
 * npm install minimist express
 * node app.ja
 */

const http = require('http');
const dotenv = require('dotenv-safe')
dotenv.config();

const options = require('minimist')(process.argv.slice(2))
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const api = require('./api');

// set defaults based on environment (virtual/local/public)
options.port = process.env.PORT || options.port || options.p  || 8080;
options.host = process.env.HOST || options.host || '0.0.0.0';
options.directory = options.directory || options.D || '.';

// show command line options
if(options.help || options.h){
    console.log("\nUsage: node app.js [options]\n");
    console.log("options:");
    console.log(" --help, -h            Show this message.");
    console.log(" --port, -p <number>   Specify port.");
    console.log(" --directory, -D <bundle>  Serve files from specific directory.")
}


app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/api", api)

// for docker
//app.use(express.static(__dirname + '/dist')) 


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(options.port, options.host, () => {
  console.log(`Server running at http://${options.host}::${options.port}/`);
});
