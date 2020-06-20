import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
	async store(req: Request, res: Response): Promise<Response> {
		const { username, email, password, defaultDestination } = req.body;

		const createUserService = new CreateUserService();

		const user = await createUserService.execute({
			username,
			email,
			password,
			defaultDestination,
		});

		return res.json(user);
	}
}

export default new UsersController();
