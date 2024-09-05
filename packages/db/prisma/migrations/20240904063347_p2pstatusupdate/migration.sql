/*
  Warnings:

  - The values [Success] on the enum `P2pStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "P2pStatus_new" AS ENUM ('Sent', 'Failure', 'Received');
ALTER TABLE "p2pTransfer" ALTER COLUMN "Status" DROP DEFAULT;
ALTER TABLE "p2pTransfer" ALTER COLUMN "Status" TYPE "P2pStatus_new" USING ("Status"::text::"P2pStatus_new");
ALTER TYPE "P2pStatus" RENAME TO "P2pStatus_old";
ALTER TYPE "P2pStatus_new" RENAME TO "P2pStatus";
DROP TYPE "P2pStatus_old";
ALTER TABLE "p2pTransfer" ALTER COLUMN "Status" SET DEFAULT 'Failure';
COMMIT;
