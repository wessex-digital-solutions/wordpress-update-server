import express from 'express';

export const modifyMessage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  req.body.message = `SAYS: ${req.body.message}`;
  next();
};

// method to check body has a message
export const hasMessage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (!req.body.message) {
    // res.status(400).send('Missing message');
    next(new Error('message is required'));
  } else {
    next();
  }
};
