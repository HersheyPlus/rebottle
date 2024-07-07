import express from 'express';
import { getTranscations, getTransactionById, exchangePoints } from '../controllers/pointTransactionController.js';

const router = express.Router();

router.get('/transaction', getTranscations)
router.get('/transaction/:id', getTransactionById)
router.put('/exchanges', exchangePoints)


export default router;