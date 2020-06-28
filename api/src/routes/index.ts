import { Router } from 'express';

import usersRouter from './users.routes';
import universitiesRouter from './universities.routes';

const router = Router();

router.use('/users', usersRouter);

router.use('/universities', universitiesRouter);

export default router;
