import { Document } from 'mongoose';
import ICreateUserDTO from './dtos/ICreateUserDTO';

export default interface IUserRepository {
	create(data: ICreateUserDTO): Promise<Document>;
}
