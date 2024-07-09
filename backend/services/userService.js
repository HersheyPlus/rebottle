import bcrypt from "bcryptjs";
import prisma from "../utils/prisma.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";

export const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = generateToken(user.id);
    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const refreshUserToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, refreshToken: true },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const profile = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      currentPoints: true,
      totalPointsEarned: true,
      role: true,
      profileImageUrl: true,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found`);
  }
  const { id: userId, ...data } = user;
  return { message: "User found", user: { userId, ...data } };
};

export const register = async ({ email, password }) => {
  const adminEmails = [
    "admin_bomb@gmail.com",
    "admin_touch@gmail.com",
    "admin_tun@gmail.com",
  ];
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  let user;

  if (adminEmails.includes(email)) {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  const token = generateToken(user.id);

  return {
    message: "Created email successfully",
    email: user.email,
    token: token,
  };
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: refreshToken },
  });

  return {
    message: "Login successful",
    user: { id: user.id, email: user.email },
    accessToken,
    refreshToken,
  };
};

export const updateProfile = async (userId, updateData) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      profileImageUrl: true,
    },
  });

  return { message: "Profile updated successfully", user: updatedUser };
};

export const clearRefreshToken = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
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
