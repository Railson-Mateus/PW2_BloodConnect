/*
  Warnings:

  - You are about to drop the column `donor_id` on the `donations` table. All the data in the column will be lost.
  - Added the required column `donorId` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `donations` DROP FOREIGN KEY `donations_donor_id_fkey`;

-- AlterTable
ALTER TABLE `donations` DROP COLUMN `donor_id`,
    ADD COLUMN `donorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_donorId_fkey` FOREIGN KEY (`donorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
