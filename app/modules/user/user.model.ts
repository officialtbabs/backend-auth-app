import { Schema, model } from "mongoose";
import { IUser } from "./user.types";

const UserSchema: Schema = new Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isVerified: { type: Boolean, require: true },
});

UserSchema.set("timestamps", true);

const User = model<IUser>("User", UserSchema);

export default User;
