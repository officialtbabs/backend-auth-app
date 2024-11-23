import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./config/db";
import authTypeDefs from "./modules/auth/auth.schema";
import authResolvers from "./modules/auth/auth.resolver";
import userTypeDefs from "./modules/user/user.schema";
import userResolvers from "./modules/user/user.reslover";
import DateTimeResolvers from "./shared/modules/dateTime/dateTime.reslover";
import dateTimeTypeDefs from "./shared/modules/dateTime/dateTime.schema";
import { GraphQLErrorAuthenticationError } from "./types";

(async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [authTypeDefs, userTypeDefs, dateTimeTypeDefs],
    resolvers: [authResolvers, userResolvers, DateTimeResolvers],
    formatError: (err: GraphQLErrorAuthenticationError) => {
      const extensions = err.extensions;

      // Include specific error codes or messages
      return {
        message: err.message,
        code: extensions.code,
        error: err,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  await connectDB();

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
})();
