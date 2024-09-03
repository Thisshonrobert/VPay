-- CreateEnum
CREATE TYPE "P2pStatus" AS ENUM ('Success', 'Failure');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "Status" "P2pStatus" NOT NULL DEFAULT 'Failure';
