import { Schema, models, model } from "mongoose";

export interface ISchema {
  type: string
  unique?: [boolean, string]
  required: [boolean, string]
}

interface IUser {
  email: ISchema
  username: ISchema
  password: ISchema
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    unique: [true, 'Username already exists!'],
    required: [true, 'Username is required!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  }
});

const User = models.User<IUser> || model<IUser>('User', userSchema);
export default User;