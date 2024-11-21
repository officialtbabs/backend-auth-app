import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET ||
  "d9c645c8fa193c73d113ff5ce3c1835977b4ee0ea2cd2a13ca25d192516b65cd";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};
