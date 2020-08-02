import { Router } from 'express';

import ConversationController from '../controllers/ConversationController';
import MessageController from '../controllers/MessageController';

const routes = Router();

const conversationCtrl = new ConversationController();

routes.get('/conversations', conversationCtrl.index.bind(conversationCtrl));
routes.get('/conversations/:id', conversationCtrl.show.bind(conversationCtrl));
routes.post('/conversations', conversationCtrl.create.bind(conversationCtrl));

const messageCtrl = new MessageController();

routes.get(
  '/conversations/:conversationId/messages',
  messageCtrl.index.bind(messageCtrl),
);
routes.post(
  '/conversations/:conversationId/messages',
  messageCtrl.create.bind(messageCtrl),
);

export default routes;
