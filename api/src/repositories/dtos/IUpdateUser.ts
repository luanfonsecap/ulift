export default interface IUpdateUserDTO {
	username: string;
	email: string;
	defaultDestination: string;
	password?: string;
	oldPassword?: string;
}
