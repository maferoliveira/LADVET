-- AlterTable
ALTER TABLE `animal` MODIFY `raca` VARCHAR(191) NOT NULL DEFAULT 'Não informado',
    MODIFY `porte` VARCHAR(191) NOT NULL DEFAULT 'Não informado';

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `bairro` VARCHAR(191) NULL,
    ADD COLUMN `cep` VARCHAR(191) NULL,
    ADD COLUMN `endereco` VARCHAR(191) NULL,
    ADD COLUMN `espaco` VARCHAR(191) NULL,
    ADD COLUMN `numero` VARCHAR(191) NULL,
    ADD COLUMN `residencia` VARCHAR(191) NULL,
    ADD COLUMN `rotina` VARCHAR(191) NULL;
