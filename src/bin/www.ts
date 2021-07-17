#!/usr/bin/env node
/**
 * Module dependencies.
 */
// const debug = require('debug')('quick-credit:server');
import debug from 'debug';
import http from 'http';
import app from '../app';
import { port } from '../settings';
import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
const debugLog = debug('app');

const Cors = cors({
  origin: true,
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Origin',
    'Accept',
    'x-api-key',
    'X-Signature',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});

app.use(Cors);

app.all('*', (req, res, next) => {
  Cors;
  next();
});

app.options('*', Cors);

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};
/**
 * Get port from environment and store in Express.
 */
const serverPort = normalizePort(port || '3000');
// app.set('port', serverPort);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      alert(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      alert(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debugLog(`Listening on ${bind}`);
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(serverPort);
server.on('error', onError);
server.on('listening', onListening);

process.on('SIGINT', () => {
  debugLog('Shutting down server');
  process.exit(0);
});
