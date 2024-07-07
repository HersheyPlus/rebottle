import prisma from '../utils/prisma.js';

export const getAllTransactions = async (user) => {
    const email = user.email;
    const userId = user.id;
    
    const transactions = await prisma.pointTransaction.findMany({
        where : {
            userId: userId
        }
    })

    return { 
        message: `Get transactions of userId: ${userId} (${email})`, 
        transactions: transactions ,
        total : transactions.length
    };
}

export const getTranscationById = async (user, transactionId) => {
    const email = user.email;
    const userId = user.id;


    const transaction = await prisma.pointTransaction.findUnique({
        where : {
            id: transactionId
        }
    })

    if (!transaction) {
        throw new Error(`Transaction with id ${transactionId} not found`);
    }

    if (userId !== transaction.userId) {
        throw new Error(`Transaction with id ${transactionId} not found for user with id ${userId} (${email})`);
    }

    return { 
        message: `Get transaction with id: ${transactionId} of userId: ${userId} (${email})`, 
        transaction: transaction 
    };
}
export const exchangePoints = async (user, exchangePoints) => {
    const userId = user.id;
    if (!userId) {
        throw new Error(`User not found`);
    }

    const email = user.email;
    const userPoints = await prisma.user.findUnique({
        where : {
            id:userId
        },
        select : {
            currentPoints : true
        }
    })

    if (userPoints.currentPoints < exchangePoints) {
        throw new Error(`Not enough points to exchange`);
    }

    const updateUserPoints = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            currentPoints: {
                decrement: exchangePoints,
            },
        },
    });
    const createTransaction = await prisma.pointTransaction.create({
        data : {
            userId: userId,
            amount: exchangePoints,
            type: "SPEND",
            email:email
        }
    })
    return { 
        message: `Exchanged ${exchangePoints} points for user with id: ${userId} (${email})`, 
        user: updateUserPoints,
        transaction: createTransaction
    };
}