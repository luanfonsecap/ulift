import ICreateUserDTO from './ICreateUserDTO';

export default interface IUpdateUserDTO extends ICreateUserDTO {
	oldPassword: string;
}
