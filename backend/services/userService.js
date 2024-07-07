import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma.js';
import {generateToken} from '../utils/generateToken.js';


export const profile = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      currentPoints: true,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }
  const { id: userId, ...data } = user;
  return { message: "User found",user: { userId, ...data } };

}

export const register = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email: email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    }
  });
  const token = generateToken(user.id);

  return { message: "Created email successfully",email: user.email,token: token };
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { message:"Login successfully", userId:user.id, user: user.email, token: token };
};

export const updateEmail = async (userId, currentEmail, newEmail) => {
  if (!newEmail) {
    throw new Error('New email is required for update');
  }

  const existingUser = await prisma.user.findUnique({ where: { email: newEmail } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { email: newEmail }
  });

  await prisma.pointTransaction.updateMany({
    where: { userId: userId },
    data: { email: newEmail }
  });

  return { message:"Updated email successfully",newEmail: updatedUser.email };
};

export const remove = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }

  await prisma.user.delete({
    where: { email },
  });

  return { message: `Delete email success, email: ${email}` };
};