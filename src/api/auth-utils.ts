import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserEntity } from 'src/users/entities/create-user.entity';

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const unsecureUserForToken = (user: CreateUserEntity) => {
  const { password, ...userForToken } = user;
  return userForToken;
};

export const generateToken = (user: CreateUserEntity) => {
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


