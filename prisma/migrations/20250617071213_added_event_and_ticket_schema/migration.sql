/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarURL" TEXT,
ADD COLUMN     "batch" INTEGER NOT NULL,
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "semester" INTEGER NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "images" TEXT[],
    "files" TEXT[],
    "capacity" INTEGER,
    "department" TEXT,
    "club" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
