/*
  Warnings:

  - You are about to drop the column `telefone` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,cpf,phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_cpf_telefone_key";

-- DropIndex
DROP INDEX "user_telefone_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "telefone",
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_cpf_phone_key" ON "user"("email", "cpf", "phone");
