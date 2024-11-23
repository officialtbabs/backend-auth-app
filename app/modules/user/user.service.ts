import mongoose from "mongoose";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserProfile(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid user ID format");

    const user = await this.userRepository.findUserById(id);
    if (!user) throw new Error("User not found");

    return user;
  }
}
