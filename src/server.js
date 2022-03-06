/* global require,process,console*/

/**
 * Usage:
 * 
 * npm install minimist express
 * node app.ja
 */

import { createServer } from 'http';
import { config } from 'dotenv-safe';
config({
  example: '.env'
});

const options = require('minimist')(process.argv.slice(2))
import express, { urlencoded } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

import api from "./api";

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
app.use(urlencoded({ extended: true}))

app.use("/api", api)

// for docker
//app.use(express.static(__dirname + '/dist')) 


const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(options.port, options.host, () => {
  console.log(`Server running at http://${options.host}::${options.port}/`);
});
