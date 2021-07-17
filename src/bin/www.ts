#!/usr/bin/env node

import app from '../app';
import { port } from '../settings';
import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
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

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.all('*', (req, res, next) => {
  Cors;
  next();
});

app.options('*', Cors);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.use(
  async (
    err: Error,
    req: express.Request,
    res: express.Response
    // next: express.NextFunction
  ) => {
    try {
      debugLog(err);
      res.status(500).send({ message: 'Please try again' });
    } catch (error) {
      res.status(500).send({ message: err });
    }
  }
);

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
const serverPort = normalizePort(port);

app.listen(serverPort, () => {
  debugLog(`Server is listening on port ${port}`);
});

process.on('SIGINT', () => {
  debugLog('Shutting down server');
  process.exit(0);
});
