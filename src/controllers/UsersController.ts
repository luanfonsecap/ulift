import { Request, Response } from 'express';
import * as Yup from 'yup';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import AppError from '../errors/AppError';
import YupValidationError from '../errors/YupValidationError';

class UsersController {
	async store(req: Request, res: Response): Promise<Response> {
		const { username, email, password, defaultDestination } = req.body;

		const createUserService = new CreateUserService();

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

		const user = await createUserService.execute({
			username,
			email,
			password,
			defaultDestination,
		});

		return res.json(user);
	}

	async update(req: Request, res: Response): Promise<Response> {
		const {
			username,
			email,
			password,
			oldPassword,
			defaultDestination,
			confirmPassword,
		} = req.body;
		const { id } = req.params;
		const updateUserService = new UpdateUserService();

		if (!id) {
			throw new AppError('No Id has provided');
		}

		const schema = Yup.object().shape({
			username: Yup.string().required('Username is required'),
			email: Yup.string()
				.email('Inser a valid e-mail')
				.required('E-mail is required'),
			password: Yup.string().min(
				6,
				'The password must be at least six characters long',
			),
			confirmPassword: Yup.string().when('password', {
				is: true,
				then: Yup.string()
					.required('Confirm password is required')
					.equals([Yup.ref('password')], 'New password does not match'),
			}),
			oldPassword: Yup.string().when('password', {
				is: true,
				then: Yup.string().required('Current password is required'),
			}),
		});

		try {
			await schema.validate({
				username,
				email,
				password,
				oldPassword,
				defaultDestination,
				confirmPassword,
			});
		} catch (error) {
			throw new YupValidationError(error.message);
		}

		const updatedUser = await updateUserService.execute(id, {
			username,
			email,
			password,
			oldPassword,
			defaultDestination,
		});

		return res.json(updatedUser);
	}
}

export default new UsersController();
