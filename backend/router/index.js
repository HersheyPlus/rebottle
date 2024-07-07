import express from 'express';
import userRouter from './userRouter.js';
import reportRouter from './reportRouter.js';
import adminRouter from './adminRouter.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/report', reportRouter);
router.use('/admin',adminRouter);

export default router;