import prisma from "../utils/prisma.js";
import { earnedPoints } from "../utils/points.js";



export const getAllReports = async (user) => {
    const reports = await prisma.report.findMany();
    return { message: `Get all reports (admin)`, reports: reports, total: reports.length };
}

export const getReportById = async (email, reportId) => {
    let report;
    report = await prisma.report.findUnique({
        where: { id: parseInt(reportId) },
    });

    if (!report) {
        throw new Error(`Report with id ${reportId} not found`);
    }
    return { message: `Get report by id (admin: ${email})`, report: report};
}

export const updateReport = async (email, reportId, updateReport) => {
    const {plasticCount, glassCount, aluminumCount, milkCount} = updateReport;
    const totalCount = plasticCount + glassCount + aluminumCount + milkCount;
    const points = await earnedPoints(plasticCount, glassCount, aluminumCount, milkCount)

    const report = await prisma.report.findUnique({
        where: {
            id: parseInt(reportId),
        },
    });

    if (!report) {
        throw new Error(`Report with id ${reportId} not found`);
    }

    if (report.status === "CANCELLED") {
        throw new Error(`Report with id ${reportId} has been cancelled`);
    }

    if (report.status === "COLLECTED") {
        throw new Error(`Report with id ${reportId} has been completed`);
    }

    const collectedReport = await prisma.report.update({
        where: {
          id: parseInt(reportId),
        },
        data: {
          status: "COLLECTED",
          plasticCount: plasticCount,
          glassCount: glassCount,
          aluminumCount: aluminumCount,
          milkCount: milkCount,
          totalCount: totalCount,
          earnedPoints: points,
        },
    });
    const updateUserPoints = await prisma.user.update({
        where: {
            id: report.userId,
        },
        data: {
            currentPoints: {
                increment: points,
            },
            totalPointsEarned: {
                increment: points,
            }
        },
    });

    const userEmail = await prisma.user.findUnique({
        where: {
            id: report.userId,
        },
    });

    const createTransaction = await prisma.pointTransaction.create({
        data : {
            userId: report.userId,
            amount: points,
            type: "EARN",
            reportId: parseInt(report.id),
            email:userEmail.email
        }
    })

    return { message: `Report collected successfully (by admin: ${email})`, report: collectedReport, user: updateUserPoints, transcation: createTransaction};
}