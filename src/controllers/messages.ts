import express from 'express';
import Model from '../models/model';

const messagesModel = new Model('messages');

export const messagesPage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
  } catch (error) {
    res.status(500).json({ message: error.stack });
  }
};

export const addMessage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    res.status(201).json({ message: data.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.stack });
  }
};
