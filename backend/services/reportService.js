import prisma from "../utils/prisma.js";

export const getAllReports = async (user) => {
  const userId = user.id;
  const userEmail = user.email;

  const reports = await prisma.report.findMany({
    where: {
      userId,
    },
  });
  return {
    message: `Get all reports from userId: ${userId} (${userEmail})`,
    reports: reports,
    total: reports.length,
  };
};

export const getReportById = async (user, reportId) => {
  const userId = user.id;
  const email = user.email;
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
      userId: userId,
    },
  });
  if (!report) {
    throw new Error(`Report with id ${reportId} not found`);
  }
  return { message: `Get report with id ${reportId}, userId: ${userId} (${email})`, report: report };
};

export const createReport = async (
  userId,
  { description, latitude, longitude }
) => {
  const report = await prisma.report.create({
    data: {
      description,
      latitude,
      longitude,
      userId,
    },
  });
  return { message: "Created report successfully", report: report };
};

export const updateReport = async (reportId, userId, updateData) => {
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });

  if (!report || report.userId !== userId) {
    throw new Error(`Report with id ${reportId} not found`);
  }

  const dataToUpdate = {};
  if ("description" in updateData)
    dataToUpdate.description = updateData.description;
  if ("latitude" in updateData) dataToUpdate.latitude = updateData.latitude;
  if ("longitude" in updateData) dataToUpdate.longitude = updateData.longitude;

  if (Object.keys(dataToUpdate).length > 0) {
    const updatedReport = await prisma.report.update({
      where: {
        id: reportId,
      },
      data: dataToUpdate,
    });
    return { message: "Updated report successfully", report: updatedReport };
  } else {
    return { message: "No fields to update", report: report };
  }
};

export const cancelReport = async (reportId, userId) => {
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });
  if (!report || report.userId !== userId) {
    throw new Error(`Report with id ${reportId} not found`);
  }

  if (report.status === "CANCELLED") {
    throw new Error(`Report with id ${reportId} has been cancelled`);
  }


  const cancelledReport = await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  return { message: "Cancelled report successfully", report: cancelledReport };
};
