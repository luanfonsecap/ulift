import { Document } from 'mongoose';

import UserRepository from '../repositories/implementations/UserRepostiroy';
import UserDTO from '../repositories/dtos/ICreateUserDTO';

class CreateUserService {
	public async execute({
		username,
		password,
		email,
		defaultDestination,
	}: UserDTO): Promise<Document> {
		const userRepository = new UserRepository();

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
