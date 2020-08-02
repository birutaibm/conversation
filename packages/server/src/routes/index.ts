import { Router } from 'express';

import conversationRouter from './conversation.routes';

const routes = Router();

routes.use(conversationRouter);

export default routes;
