import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import debug from 'debug';
const log: debug.IDebugger = debug('app');

import indexRouter from './routes';

const app = express();

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
  methods: [ 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE' ],
  credentials: true,
});

app.use(Cors);

app.all('*', (req, res, next) => {
  Cors;
  next();
});

app.options('*', Cors);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welcome to the API!,you can find all the endpoints here: https://github.com/wessex-digital-solutions/wordpress-update-server/wiki' });
});
app.use('/v1', indexRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ): void => {
    log(err.stack);
    res.status(400).json({ error: err.stack });
  }
);

export default app;
