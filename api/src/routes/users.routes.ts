import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/', UsersController.store);
usersRouter.put('/:id', UsersController.update);
usersRouter.delete('/:id', UsersController.delete);

export default usersRouter;
