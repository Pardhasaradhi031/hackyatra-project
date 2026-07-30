import bcrypt from "bcrypt";
import jwt, {JwtPayload} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

// Function to hash a password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Function to compare a password with a hashed password
export async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

// Function to generate a JWT token
export function generateToken(payload: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Function to verify a JWT token
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload & {
    id: string;
    email: string;
    role: string;
  };
}