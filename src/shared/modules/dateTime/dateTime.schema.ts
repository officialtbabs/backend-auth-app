import { gql } from "apollo-server-express";

const dateTimeTypeDefs = gql`
  scalar DateTime 

  input AuthRegistrationInput {
    email: String!
    password: String!
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

export default dateTimeTypeDefs;
