import { Request, Response } from 'express';

import CreateSessionService from '../services/CreateSessionService';
import UserRepository from '../repositories/implementations/UserRepostiroy';

class SessionsController {
	public async store(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const createSessionService = new CreateSessionService(new UserRepository());

		const tokenSession = await createSessionService.execute(email, password);

		return res.json(tokenSession);
	}
}

export default new SessionsController();
