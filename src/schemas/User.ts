import mongoose, { Schema, Document } from 'mongoose';
import { hash } from 'bcryptjs';

import IUser from './interfaces/IUser';

type UserSchemaProps = IUser & Document;

const UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	defaultDestination: String,
});

UserSchema.pre<UserSchemaProps>('save', async function (next) {
	if (!this.isModified('password')) return next();

	const hashedPassword = await hash(this.password, 8);

	this.password = hashedPassword;
	return next();
});

export default mongoose.model('User', UserSchema);
