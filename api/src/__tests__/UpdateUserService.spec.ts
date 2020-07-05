import CreateUserService from '~/services/CreateUserService';
import UpdateUserService from '~/services/UpdateUserService';
import FakeUserRepository from './fakes/FakeUserRepository';
import AppError from '~/errors/AppError';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let updateUserService: UpdateUserService;

describe('Create User Service', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
		createUserService = new CreateUserService(fakeUserRepository);
		updateUserService = new UpdateUserService(fakeUserRepository);
	});

	it('should be able to update a user', async () => {
		const user = await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		const updatedUser = await updateUserService.execute(user.id, {
			username: 'Luan Fonseca',
			email: 'luan@email.com',
			defaultDestination: 'Una Betim',
		});

		expect(updatedUser.username).toEqual('Luan Fonseca');
	});

	it('should be able to update a user password', async () => {
		const user = await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		const updatedUser = await updateUserService.execute(user.id, {
			username: 'Luan',
			email: 'luan@email.com',
			defaultDestination: 'Una Betim',
			oldPassword: '123123',
			password: 'new-password',
		});

		expect(updatedUser.password).toBeTruthy();
	});

	it('should not be able to update a user password with wrong old password', async () => {
		const user = await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		await expect(
			updateUserService.execute(user.id, {
				username: 'Luan',
				email: 'luan@email.com',
				defaultDestination: 'Una Betim',
				oldPassword: 'wrong-old-password',
				password: 'new-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update the user's email if it is already in use", async () => {
		await createUserService.execute({
			username: 'Luan',
			email: 'luan@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		const user = await createUserService.execute({
			username: 'Luan Fonseca',
			email: 'luanfonseca@email.com',
			password: '123123',
			defaultDestination: 'Una Betim',
		});

		await expect(
			updateUserService.execute(user.id, {
				username: 'Luan',
				email: 'luan@email.com',
				defaultDestination: 'Una Betim',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
