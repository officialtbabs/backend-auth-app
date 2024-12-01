import {
  AuthenticationErrorCodesEnums,
  GraphQLErrorAuthenticationError,
} from "../../types";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserProfile(_parent: any, _args: any, { user }: any) {
    if (!user)
      throw new GraphQLErrorAuthenticationError(
        AuthenticationErrorCodesEnums.unauthorized,
        "User is not logged in."
      );

    const { id } = user;

    return await this.userService.getUserProfile(id);
  }
}
