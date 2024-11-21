import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isVerified: boolean;
}

const UserSchema: Schema = new Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isVerified: { type: Boolean, require: true },
});

UserSchema.set("timestamps", true);

export default mongoose.model<IUser>("User", UserSchema);
