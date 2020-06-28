import { Router } from 'express';

import UniversityController from '../controllers/UniversityController';

const universitiesRouter = Router();

universitiesRouter.get('/', UniversityController.index);

export default universitiesRouter;
