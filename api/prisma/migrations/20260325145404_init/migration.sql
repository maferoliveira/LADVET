-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `tipo_usuario` ENUM('ADOTANTE', 'CLINICA') NOT NULL,
    `crmv` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `especie` VARCHAR(191) NOT NULL,
    `raca` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `porte` VARCHAR(191) NOT NULL,
    `temperamento` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NOT NULL,
    `status` ENUM('DISPONIVEL', 'EM_PROCESSO', 'ADOTADO') NOT NULL DEFAULT 'DISPONIVEL',
    `usuarioID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adocao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `moradia` VARCHAR(191) NOT NULL,
    `temQuintal` BOOLEAN NOT NULL,
    `experiencia` VARCHAR(191) NULL,
    `tempoDisponivel` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDENTE', 'APROVADA', 'RECUSADA') NOT NULL DEFAULT 'PENDENTE',
    `animalID` INTEGER NOT NULL,
    `adotanteID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_usuarioID_fkey` FOREIGN KEY (`usuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adocao` ADD CONSTRAINT `Adocao_animalID_fkey` FOREIGN KEY (`animalID`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adocao` ADD CONSTRAINT `Adocao_adotanteID_fkey` FOREIGN KEY (`adotanteID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
