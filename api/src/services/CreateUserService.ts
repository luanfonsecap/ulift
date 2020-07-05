import { Document } from 'mongoose';

import UserDTO from '../repositories/dtos/ICreateUserDTO';
import AppError from '../errors/AppError';
import IUserRepository from '~/repositories/interfaces/IUserRepository';
import IUser from '~/schemas/interfaces/IUser';

class CreateUserService {
	private userRepository: IUserRepository;

	constructor(repository: IUserRepository) {
		this.userRepository = repository;
	}

	public async execute({
		username,
		password,
		email,
		defaultDestination,
	}: UserDTO): Promise<IUser> {
		const userExist = await this.userRepository.findByEmail(email);

		if (userExist) {
			throw new AppError('This e-mail address is already in use');
		}

		const user = await this.userRepository.create({
			username,
			password,
			email,
			defaultDestination,
		});

		return user;
	}
}

export default CreateUserService;
