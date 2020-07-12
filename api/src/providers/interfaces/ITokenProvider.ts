export default interface ITokenProvider {
	generateToken(userId: string): string;
}
