import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/', UsersController.store);
usersRouter.post('/:id', UsersController.update);

export default usersRouter;
