import UserRepository from '../repositories/implementations/UserRepostiroy';

class DeleteUserService {
	public async execute(id: string): Promise<void> {
		const userRepository = new UserRepository();

		await userRepository.delete(id);
	}
}

export default DeleteUserService;
