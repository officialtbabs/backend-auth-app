import { gql } from "apollo-server-express";

const authTypeDefs = gql`
  type AuthResponse {
    user: User!
    token: String!
  }

  input AuthRegistrationInput {
    email: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  input AuthLoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    register(input: AuthRegistrationInput!): AuthResponse!
    login(input: AuthLoginInput!): AuthResponse!
  }
`;

export default authTypeDefs;
