-- Script SQL para agregar campos base a las tablas existentes
-- Ejecuta este script en tu base de datos MySQL antes de activar synchronize
-- Conéctate a tu base de datos Railway y ejecuta estos comandos

-- Agregar campos a la tabla company
-- Si las columnas ya existen, estos comandos fallarán, pero puedes ignorar el error
ALTER TABLE `company` 
ADD COLUMN `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `company` 
ADD COLUMN `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `company` 
ADD COLUMN `deletedAt` DATETIME NULL;

-- Agregar campos a la tabla user (si es necesario)
ALTER TABLE `user` 
ADD COLUMN `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `user` 
ADD COLUMN `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `user` 
ADD COLUMN `deletedAt` DATETIME NULL;
