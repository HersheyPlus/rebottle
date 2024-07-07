import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  createReport, 
  getReports, 
  updateReport, 
  cancelReport,
  getReportById
} from '../controllers/reportController.js';

const router = express.Router()


// Protected all route before CRUD about report

router.use(authenticateToken)
router.post('/create', createReport);
router.get('/get', getReports);
router.get('/get/:id', getReportById);
router.put('/update/:id', updateReport);
router.put('/cancel/:id', cancelReport);

export default router