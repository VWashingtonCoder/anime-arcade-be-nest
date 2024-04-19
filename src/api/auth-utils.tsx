import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const unsecureUserForToken = (user: CreateUserDto) => {
  const { password, ...userForToken } = user;
  return userForToken;
};

export const generateToken = (user: CreateUserDto) => {
  return jwt.sign(unsecureUserForToken(user), process.env.JWT_SECRET);
};

export const validateToken = (token: string) => {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log('Error validating token:', error.message);
    return null;
  }
};


