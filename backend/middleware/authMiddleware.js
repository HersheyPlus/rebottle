import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
    if (!user) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};