import express from 'express';
import { hasMessage, modifyMessage } from '../middleware/middleware';
import {
  indexPage,
  messagesPage,
  getMessageById,
  addMessage,
  updateMessage,
  deleteMessage,
} from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.get('/messages/:messageId', getMessageById);
indexRouter.post('/messages', hasMessage, modifyMessage, addMessage);
indexRouter.put(
  '/messages/:messageId',
  hasMessage,
  modifyMessage,
  updateMessage
);
indexRouter.delete('/messages/:messageId', deleteMessage);

export default indexRouter;
