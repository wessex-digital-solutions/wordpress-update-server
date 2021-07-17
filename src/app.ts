import express from 'express';
import dotenv from 'dotenv';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

dotenv.config();

const port = process.env.PORT || 3000;

const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');

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

app.use(express.json());
app.use(Cors);

app.use(expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
}));

app.all(
  '*',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Cors;
    next();
  },
);

app.options('*', Cors);

app.use(expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
}));

app.get('/', (req, res) => {
  console.log('API Status: Seems Good');
  res.send('API Status: Seems Good');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(async (err: any, req: any, res: any, next: any) => {
  try {
    console.error(err);
    res.status(500).send({message: "Please try again"});
  } catch (error) {
    res.status(500).send({message: err});
  }
});

process.on('SIGINT', () => {
  console.log('Shutting down server');
  process.exit(0);
});
