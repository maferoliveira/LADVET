/*
  Migration compatível com bancos em que algumas colunas já existem.
  A coluna motivo pode ter sido criada por uma versão anterior do banco.
*/
SET @sql = IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'adocao' AND COLUMN_NAME = 'motivo') = 0,
  'ALTER TABLE `adocao` ADD COLUMN `motivo` VARCHAR(191) NOT NULL',
  'SELECT 1'
);
PREPARE ladvet_stmt FROM @sql;
EXECUTE ladvet_stmt;
DEALLOCATE PREPARE ladvet_stmt;

SET @sql = IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'animal' AND COLUMN_NAME = 'descricao') = 0,
  'ALTER TABLE `animal` ADD COLUMN `descricao` VARCHAR(191) NULL',
  'SELECT 1'
);
PREPARE ladvet_stmt FROM @sql;
EXECUTE ladvet_stmt;
DEALLOCATE PREPARE ladvet_stmt;

ALTER TABLE `animal` MODIFY `foto` LONGTEXT NOT NULL;

SET @sql = IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuario' AND COLUMN_NAME = 'experiencia') = 0,
  'ALTER TABLE `usuario` ADD COLUMN `experiencia` VARCHAR(191) NULL',
  'SELECT 1'
);
PREPARE ladvet_stmt FROM @sql;
EXECUTE ladvet_stmt;
DEALLOCATE PREPARE ladvet_stmt;
