import * as pointTransactionService from '../services/pointTransactionService.js';


export const getTranscations = async (req, res, next) => {
    try {
        const points = await pointTransactionService.getAllTransactions(req.user);
        res.status(200).json(points);
    } catch (error) {
        next(error)
    }
}

export const getTransactionById = async (req, res, next) => {
    try {
        const transactionId = parseInt(req.params.id);
        const points = await pointTransactionService.getTranscationById(req.user, transactionId);
        res.status(200).json(points);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({ message: error.message });
        } else {
            next(error)
        }
    }
}

export const exchangePoints = async (req, res, next) => {
    try {
        const exchangePoints = req.body.points;
        await pointTransactionService.exchangePoints(req.user, exchangePoints);
        res.status(200).json({ message: `Points exchanged successfully`, userId: req.user.id, currentPoint: req.user.currentPoints});
        
    } catch (error) {
        if (error.message.includes('not found') || error.message.includes('Not enough points')) {
            res.status(404).json({ message: error.message });
        } else {
            next(error)
        }
    }
}