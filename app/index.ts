import express, { NextFunction, Response } from "express";
import { ApolloServer, CorsOptions } from "apollo-server-express";
import { connectDB } from "./config/db";
import authTypeDefs from "./modules/auth/auth.schema";
import authResolvers from "./modules/auth/auth.resolver";
import userTypeDefs from "./modules/user/user.schema";
import userResolvers from "./modules/user/user.reslover";
import DateTimeResolvers from "./shared/modules/dateTime/dateTime.reslover";
import dateTimeTypeDefs from "./shared/modules/dateTime/dateTime.schema";
import { AuthenticatedRequest, GraphQLErrorAuthenticationError } from "./types";
import authMiddleware from "./middlewares/auth.middleware";
// import os from "os";
import { getNetworkAddress } from "./shared/utils/core.util";
import https from "https";
import fs from "fs";

const PORT = process.env.PORT || 4000;
const HOST = getNetworkAddress();
const corsOptions: CorsOptions = {
  origin: true,
  // typeof process.env.CORS_WHITELIST === "string"
  //   ? process.env.CORS_WHITELIST.split(",")
  //   : [],
  credentials: true,
};
const sslOptions = {
  key: fs.readFileSync("./certs/private.key"),
  cert: fs.readFileSync("./certs/certificate.crt"),
};

(async () => {
  const app = express();

  await connectDB().then(async () => {
    app.use(authMiddleware);

    const httpsServer = https.createServer(sslOptions, app);

    const server = new ApolloServer({
      typeDefs: [authTypeDefs, userTypeDefs, dateTimeTypeDefs],
      resolvers: [authResolvers, userResolvers, DateTimeResolvers],
      context: ({ req }: any) => {
        const user = (req as AuthenticatedRequest).user || null;
        return { user };
      },
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
    server.applyMiddleware({ app, cors: corsOptions });

    httpsServer.listen(PORT, () => {
      console.log(`Server is running on https://${HOST}:${PORT}/graphql`);
    });
  });
})();
