import { IUser } from "../user/user.types";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(
    parent: any,
    args: {
      input: Pick<IUser, "email" | "password" | "firstname" | "lastname">;
    }
  ) {
    const { email, password, firstname, lastname } = args.input;

    return await this.authService.register({
      email,
      password,
      firstname,
      lastname,
    });
  }

  async login(parent: any, args: { input: Pick<IUser, "email" | "password"> }) {
    const { email, password } = args.input;

    return await this.authService.login({ email, password });
  }
}
