import * as adminService from '../services/adminService.js';

export const getReports = async (req, res, next) => {
    try {
        const report = await adminService.getAllReports(req.user, req.body)
        res.status(201).json(report);
    } catch (error) {
        if (error.message.includes('not authorized')) {
            res.status(404).json({ message: error.message });
          } else {
            next(error);
          }
    }
}

export const getReportById = async (req, res, next) => {
    try {
        const reportId = req.params.id
        const report = await adminService.getReportById(req.user.email, reportId)
        res.status(200).json(report);
    } catch (error) {
        if (error.message.includes('not found') || error.message.includes('not authorized')) {
            res.status(404).json({ message: error.message });
          } else {
            next(error);
          }
    }

}

export const updateReport = async (req, res, next) => {
    try {
        const email = req.user.email
        const reportId = parseInt(req.params.id)
        const report = await adminService.updateReport(email, reportId, req.body)
        res.status(200).json(report);
    } catch (error) {
        if (error.message.includes('not found') || error.message.includes('not authorized') || error.message.includes('cancelled') || error.message.includes('completed')) {
            res.status(404).json({ message: error.message });
          } else {
            next(error);
          }
    }
}