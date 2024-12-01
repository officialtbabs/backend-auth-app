import { comparePassword, hashPassword } from "../../shared/utils/bcrypt.util";
import { generateToken } from "../../shared/utils/jwt.util";
import {
  AuthenticationErrorCodesEnums,
  GraphQLErrorAuthenticationError,
} from "../../types";
import { UserRepository } from "../user/user.repository";
import { IUser } from "../user/user.types";

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
    if (existingUser)
      throw new GraphQLErrorAuthenticationError(
        AuthenticationErrorCodesEnums.emailIsTaken,
        "User with this email already exists."
      );

    const hashedPassword = await hashPassword(password);

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

    if (!user)
      throw new GraphQLErrorAuthenticationError(
        AuthenticationErrorCodesEnums.emailNotValid,
        "Email entered is not valid."
      );

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid)
      throw new GraphQLErrorAuthenticationError(
        AuthenticationErrorCodesEnums.passwordNotValid,
        "Password entered is not valid."
      );

    // console.log(user);

    if (!user.isVerified)
      throw new GraphQLErrorAuthenticationError(
        AuthenticationErrorCodesEnums.unauthorized,
        "Profile is penidng verification."
      );

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  }
}
