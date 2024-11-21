import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    isVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getUserProfile(id: ID!): User!
  }
`;

export default userTypeDefs;
