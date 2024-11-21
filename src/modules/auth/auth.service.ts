import { comparePassword, hashPassword } from "../../shared/utils/bcrypt.util";
import { generateToken } from "../../shared/utils/jwt.util";
import { IUser } from "../user/user.model";
import { UserRepository } from "../user/user.repository";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(
    data: Pick<IUser, "email" | "password" | "firstname" | "lastname">
  ) {
    const { email, password, firstname, lastname } = data;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User with this email already exists.");

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      isVerified: false,
    });

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  }

  async login(data: Pick<IUser, "email" | "password">) {
    const { email, password } = data;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) throw new Error("Invalid Email");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Password");

    if (!user.isVerified) throw new Error("Please verify account");

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  }
}
