import { Document } from 'mongoose';

import UserRepository from '../repositories/implementations/UserRepostiroy';
import UserDTO from '../repositories/dtos/ICreateUserDTO';
import AppError from '../errors/AppError';

class CreateUserService {
	public async execute({
		username,
		password,
		email,
		defaultDestination,
	}: UserDTO): Promise<Document> {
		const userRepository = new UserRepository();

		const userExist = await userRepository.findByEmail(email);

		if (userExist) {
			throw new AppError('This e-mail address is already in use');
		}

		const user = await userRepository.create({
			username,
			password,
			email,
			defaultDestination,
		});

		return user;
	}
}

export default CreateUserService;
