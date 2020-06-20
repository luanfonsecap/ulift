class YupValidationError {
	public readonly message: string;

	public readonly statusCode: number = 400;

	constructor(message: string) {
		this.message = message;
	}
}

export default YupValidationError;
