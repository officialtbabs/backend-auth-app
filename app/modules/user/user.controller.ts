import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserProfile(parent: any, args: { id: string }) {
    const { id } = args;

    console.log(id, args);

    return await this.userService.getUserProfile(id);
  }
}
