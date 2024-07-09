import * as reportService from "../services/reportService.js";

export const createReport = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let imageUrl = req.file ? req.file.location : null;
    const report = await reportService.createReport(userId, req.body, imageUrl);
    res.status(201).json(report);
  } catch (error) {
    next(error)
  }
};

export const getReports = async (req, res, next) => {
  try {
    const report = await reportService.getAllReports(req.user);
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const reportId = parseInt(req.params.id);
    const report = await reportService.getReportById(req.user, reportId);
    res.status(200).json(report);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reportId = parseInt(req.params.id);
    let imageUrl = req.file ? req.file.location : null;
    const report = await reportService.updateReport(reportId, userId, req.body, imageUrl);
    res.status(200).json(report);
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("not authorized")
    ) {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};
export const cancelReport = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reportId = parseInt(req.params.id);
    const report = await reportService.cancelReport(reportId, userId);
    res.status(200).json(report);
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("not authorized") ||
      error.message.includes("cancelled") 
    ) {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};
