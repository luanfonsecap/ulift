import { sign } from 'jsonwebtoken';

import ITokenProvider from '../interfaces/ITokenProvider';
import authConfig from '../../config/auth';

class TokenProvider implements ITokenProvider {
	public generateToken(userId: string): string {
		const { secret, expiresIn } = authConfig.jwt;

		return sign({}, secret, {
			subject: userId,
			expiresIn,
		});
	}
}

export default TokenProvider;
