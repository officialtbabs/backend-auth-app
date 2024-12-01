import { AuthenticationError } from "apollo-server-express";
import { NextFunction, RequestHandler, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { decodeToken, isTokenExpired } from "../shared/utils/jwt.util";
import { AuthenticatedRequest } from "../types";

const authMiddleware: RequestHandler = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
  if (!token) throw new AuthenticationError("Bearer token is missing");

  try {
    const decoded = decodeToken(token); // Verify token
    req.user = decoded; // Attach decoded user to request object

    // console.log(req.user);
    if (decoded.exp && isTokenExpired(decoded.exp * 1000))
      throw new TokenExpiredError(
        "Your session is expired",
        new Date(decoded.exp * 1000)
      );

    return next();
  } catch (error) {
    throw new AuthenticationError("Invalid token provided");
  }
};

export default authMiddleware;
