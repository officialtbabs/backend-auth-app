import { GraphQLError, GraphQLErrorOptions } from "graphql";

export enum AuthenticationErrorCodesEnums {
  // Registration error codes
  emailIsTaken = "EMAIL_IS_TAKEN",

  // Login error codes
  emailNotValid = "EMAIL_NOT_VALID",
  passwordNotValid = "PASSWORD_NOT_VALID",
  unauthorized = "UNAUTHORIZED",
}

export class GraphQLErrorAuthenticationError extends GraphQLError {
  constructor(
    code: AuthenticationErrorCodesEnums,
    message: string,
    options?: GraphQLErrorOptions
  ) {
    super(message, {
      ...options,
      extensions: {
        ...options?.extensions,
        code,
      },
    });
  }
}
