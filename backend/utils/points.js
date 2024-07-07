import prisma from "./prisma.js"

export const earnedPoints = async (plasticCount, glassCount, aluminumCount, milkCount) => {
    const bottleTypes = await prisma.bottleType.findMany({
        where: {
            name: {
                in: ["Plastic", "Glass", "Aluminum", "Milk"]
            }
        },
        select: {
            name: true,
            points: true
        }
    });

    const points = Object.fromEntries(bottleTypes.map(type => [type.name, type.points]));

    const totalPoints = 
        (points.Plastic || 0) * plasticCount +
        (points.Glass || 0) * glassCount +
        (points.Aluminum || 0) * aluminumCount +
        (points.Milk || 0) * milkCount;

    return totalPoints;
}
