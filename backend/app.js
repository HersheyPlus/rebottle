import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import constant from "./constants/index.js";
import router from './router/index.js';
import prisma from './utils/prisma.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json())

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.use('/api', router);


const PORT = process.env.PORT || constant.PORT;
const HOSTNAME = constant.HOSTNAME
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}, hostname: ${HOSTNAME}`);
});

