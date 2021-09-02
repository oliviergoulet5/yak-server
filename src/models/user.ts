import { Document, Schema, SchemaTypes, model } from 'mongoose';

const { String } = SchemaTypes;

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    avatarUrl: string;
    activityStatus: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email field is required']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    avatarUrl: {
        type: String
    },
    preferredActivityStatus: {
        type: String,
        required: [true, 'Preferred activity status field is required'],
        default: 'online'
    }
});

/*UserSchema.virtual('id').get((user: IUser) => {
    return user.id;
});*/

export const UserModel = model<IUser>('user', UserSchema);