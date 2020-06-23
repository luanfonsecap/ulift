import { Document } from 'mongoose';
import { hash, compare } from 'bcryptjs';

import UserRepository from '../repositories/UserRepostiroy';
import IUpdateUserDTO from '../repositories/dtos/IUpdateUser';
import User from '../schemas/User';
import AppError from '../errors/AppError';

class UpdateUserService {
	public async execute(
		id: string,
		{
			username,
			email,
			password,
			oldPassword,
			defaultDestination,
		}: IUpdateUserDTO,
	): Promise<Document> {
		const userRepository = new UserRepository();

		const user = await userRepository.findById(id);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		const userWithSameEmail = await User.findOne({ email });

		if (userWithSameEmail?.email && userWithSameEmail?.email !== email) {
			throw new AppError('E-mail address already in use');
		}

		if (password && !oldPassword) {
			throw new AppError('Old password is required to change current password');
		}

		if (password && oldPassword) {
			const checkOldPassword = await compare(oldPassword, user.password);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match.', 401);
			}

			user.password = await hash(password, 8);
		}

		user.email = email;
		user.defaultDestination = defaultDestination;
		user.username = username;

		await userRepository.update(user);

		return user;
	}
}

export default UpdateUserService;