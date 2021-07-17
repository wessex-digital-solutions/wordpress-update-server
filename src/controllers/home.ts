import express from 'express';

export const indexPage = (
  req: express.Request,
  res: express.Response
): express.Response =>
  res.status(200).json({ message: 'API seems to be working' });
