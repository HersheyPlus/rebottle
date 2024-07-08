import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import constant from "./constants/index.js";
import router from './router/index.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// cors options 
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200 // For legacy browser support
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

