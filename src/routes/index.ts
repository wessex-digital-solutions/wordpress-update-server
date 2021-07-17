import express from 'express';
import { modifyMessage } from '../middleware/middleware';
import { indexPage, messagesPage, addMessage } from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, addMessage);

export default indexRouter;
