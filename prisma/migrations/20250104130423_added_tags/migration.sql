/*
  Warnings:

  - You are about to drop the column `scheduleDefaultHours` on the `Provider` table. All the data in the column will be lost.
  - Added the required column `scheduleDefaultHoursEnd` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleDefaultHoursStart` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "scheduleDefaultHours",
ADD COLUMN     "scheduleDefaultHoursEnd" INTEGER NOT NULL,
ADD COLUMN     "scheduleDefaultHoursStart" INTEGER NOT NULL;
