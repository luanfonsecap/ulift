import { Document } from 'mongoose';
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

		expect(updatedUser.username).toEqual('username');
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
