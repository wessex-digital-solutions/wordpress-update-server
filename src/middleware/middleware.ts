import express from 'express';

export const modifyMessage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  req.body.message = `SAYS: ${req.body.message}`;
  next();
};
