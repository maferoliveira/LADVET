/*
  Warnings:

  - Added the required column `motivo` to the `Adocao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adocao` ADD COLUMN `motivo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `animal` ADD COLUMN `descricao` VARCHAR(191) NULL,
    MODIFY `foto` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `experiencia` VARCHAR(191) NULL;
