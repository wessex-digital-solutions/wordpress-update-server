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

// get message by id
export const getMessageById = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const data = await messagesModel.select(
      'id, name, message',
      `WHERE id = ${req.params.messageId}`
    );
    res.status(200).json({ message: data.rows[0] });
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

// update message by id
export const updateMessage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { name, message } = req.body;
  const updatedMessage = {
    name,
    message,
  };
  try {
    const data = await messagesModel.update(
      req.params.messageId,
      updatedMessage,
      'name, message'
    );
    res.status(200).json({ message: data.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.stack });
  }
};

// delete message by id
export const deleteMessage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const data = await messagesModel.delete(req.params.messageId);
    res.status(200).json({ message: data.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.stack });
  }
};
