import { Document } from 'mongoose';
import IUserRepositories from './interfaces/IUserRepository';
import ICreateUserDTO from './interfaces/dtos/ICreateUserDTO';
import User from '../schemas/User';

class UserRepository implements IUserRepositories {
	public async create({
		username,
		email,
		password,
		defaultDestination,
	}: ICreateUserDTO): Promise<Document> {
		const user = await User.create({
			username,
			email,
			password,
			defaultDestination,
		});

		return user;
	}
}

export default UserRepository;
