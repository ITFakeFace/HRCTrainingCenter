/*
  Warnings:

  - You are about to drop the column `roleId` on the `enrollments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_roleId_fkey";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "roleId";
