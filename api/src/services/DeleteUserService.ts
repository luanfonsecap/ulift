import IUserRepository from '~/repositories/interfaces/IUserRepository';
import AppError from '~/errors/AppError';

class DeleteUserService {
	private userRepository: IUserRepository;

	constructor(repository: IUserRepository) {
		this.userRepository = repository;
	}

	public async execute(id: string): Promise<void> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new AppError("This user does not already exist's");
		}

		await this.userRepository.delete(id);
	}
}

export default DeleteUserService;
