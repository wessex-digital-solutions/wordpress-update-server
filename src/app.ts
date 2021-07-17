import express from 'express';

import indexRouter from './routes';

const app = express();

app.use(express.json());

app.use('/v1', indexRouter);

export default app;
