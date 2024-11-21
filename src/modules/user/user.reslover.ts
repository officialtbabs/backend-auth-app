import { UserController } from "./user.controller";

const userController = new UserController();

const userResolvers = {
  Query: {
    getUserProfile: userController.getUserProfile.bind(userController),
  },
};

export default userResolvers;
