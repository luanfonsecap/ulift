import mongoose, { Schema } from 'mongoose';

import HashProvider from '../providers/implementations/HashProvider';
import IUser from './interfaces/IUser';

const UserSchema = new Schema(
	{
		username: String,
		email: String,
		password: String,
		defaultDestination: String,
	},
	{
		timestamps: true,
	},
);

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	const hashProvider = new HashProvider();

	const hashedPassword = await hashProvider.generateHash(this.password);

	this.password = hashedPassword;
	return next();
});

UserSchema.set('toJSON', {
	transform(_doc, ret, _options) {
		return {
			_id: ret._id,
			username: ret.username,
			email: ret.email,
			defaultDestination: ret.defaultDestination,
		};
	},
});

export default mongoose.model<IUser>('User', UserSchema);
