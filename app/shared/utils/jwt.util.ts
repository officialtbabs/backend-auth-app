import jwt, { JwtPayload } from "jsonwebtoken";

export const SECRET_KEY =
  process.env.JWT_SECRET ||
  "d9c645c8fa193c73d113ff5ce3c1835977b4ee0ea2cd2a13ca25d192516b65cd";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const decodeToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET_KEY) as JwtPayload;
};

export const isTokenExpired = (expiryTime: number): boolean => {
  const now = new Date().getTime();
  return expiryTime - now < 0;
};
