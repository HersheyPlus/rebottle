import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getReports, updateReport, getReportById } from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticateToken)
router.get('/get', getReports);
router.get('/get/:id', getReportById);
router.put('/update/:id', updateReport);


export default router;