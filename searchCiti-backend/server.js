#!/usr/bin/env node

const config = require("./config");
const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const http = require('http');

const app = new Koa();
const server = http.createServer(app.callback()).listen(config.port);
app.use(cors());
app.use(logger());
app.use(bodyParser());

require("./boot/index")(app);
require("./routes/index")(app);

server.on("error", onError);
server.on("listening", onListening);

process.title = "cities";

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("Port requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Pert is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(e) {
  console.log(`Listening on ${config.port}`);
}


module.exports = app;
