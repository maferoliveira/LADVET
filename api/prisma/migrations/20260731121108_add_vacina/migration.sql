-- CreateTable
CREATE TABLE `Vacina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataAplicacao` DATETIME(3) NOT NULL,
    `proximaDose` DATETIME(3) NULL,
    `veterinario` VARCHAR(191) NOT NULL,
    `lote` VARCHAR(191) NOT NULL,
    `animalID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacina` ADD CONSTRAINT `Vacina_animalID_fkey` FOREIGN KEY (`animalID`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
