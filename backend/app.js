import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import constant from "./constants/index.js";
import router from './router/index.js';

dotenv.config();

// Initialize Express app
const app = express();


// cors options 
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json())

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
})


// Routes
app.use('/api', router);


const PORT = process.env.PORT || constant.PORT;
const HOSTNAME = constant.HOSTNAME

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}, hostname: ${HOSTNAME}`);
});

