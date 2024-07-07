/*
  Warnings:

  - You are about to drop the column `location` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `user_current_points` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PointTransaction" DROP CONSTRAINT "PointTransaction_userId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "location",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'no description',
ADD COLUMN     "earnedPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "totalCount" SET DEFAULT 0;

-- DropTable
DROP TABLE "user_current_points";
