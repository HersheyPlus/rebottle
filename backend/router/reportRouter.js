import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  createReport, 
  getReports, 
  updateReport, 
  cancelReport,
  getReportById
} from '../controllers/reportController.js';
import { handleUpload } from '../utils/s3.js'

const router = express.Router()

// Protected all route before CRUD about report
router.use(authenticateToken)

router.post('/create', handleUpload('image'), createReport);
router.get('/get', getReports);
router.get('/get/:id', getReportById);
router.put('/update/:id', handleUpload('image'), updateReport);
router.put('/cancel/:id', cancelReport);

export default router