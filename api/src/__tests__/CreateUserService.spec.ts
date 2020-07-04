import CreateUserService from '~/services/CreateUserService';
import FakeUserRepository from './fakes/FakeUserRepository';
import AppError from '~/errors/AppError';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Create User Service', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		createUserService = new CreateUserService(fakeUserRepository);
	});

	it('should be able to create a new user', async () => {
		const user = await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		expect(user).toHaveProperty('id');
	});

	it("should not be able to create two user's with the same e-mail", async () => {
		await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		await expect(
			createUserService.execute({
				username: 'Luan',
				email: 'luan@email.com',
				password: '123123',
				defaultDestination: 'Una Betim',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
