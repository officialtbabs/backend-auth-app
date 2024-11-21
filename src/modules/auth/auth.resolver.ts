import { AuthController } from "./auth.contoller";

const authController = new AuthController();

const authResolvers = {
  Mutation: {
    register: authController.register.bind(authController),
    login: authController.login.bind(authController),
  },
};

export default authResolvers;
