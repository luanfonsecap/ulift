import { Request, Response } from 'express';
import * as Yup from 'yup';

import CreateUserService from '../services/CreateUserService';
import YupValidationError from '../errors/YupValidationError';

class UsersController {
	async store(req: Request, res: Response): Promise<Response> {
		const { username, email, password, defaultDestination } = req.body;

		const schema = Yup.object().shape({
			username: Yup.string().required('Username is required'),
			email: Yup.string()
				.email('Inser a valid e-mail')
				.required('E-mail is required'),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'The password must be at least six characters long'),
		});

		try {
			await schema.validate({ username, email, password, defaultDestination });
		} catch (error) {
			throw new YupValidationError(error.message);
		}

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
