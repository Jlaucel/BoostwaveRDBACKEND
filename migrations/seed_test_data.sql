-- Script para crear datos de prueba
-- Usuario: Cabinf, Contraseña: 123456

-- Insertar empresas de prueba
INSERT INTO `company` (`name`, `rnc`, `address`, `phone`, `logoUrl`, `createdAt`, `updatedAt`) VALUES
('BoostWave RD', '131123456', 'Av. Winston Churchill, Santo Domingo', '809-555-0101', NULL, NOW(), NOW()),
('Claudio Mayi Real State', '131789012', 'Calle Principal, La Paz', '591-555-0202', NULL, NOW(), NOW()),
('BF-Adania', '131345678', 'Sector Los Alcarrizos, Santo Domingo', '809-555-0303', NULL, NOW(), NOW())
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Obtener IDs de las empresas (asumiendo que se insertaron correctamente)
SET @boostwave_id = (SELECT id FROM `company` WHERE `name` = 'BoostWave RD' LIMIT 1);
SET @claudio_id = (SELECT id FROM `company` WHERE `name` = 'Claudio Mayi Real State' LIMIT 1);
SET @adanía_id = (SELECT id FROM `company` WHERE `name` = 'BF-Adania' LIMIT 1);

-- Insertar usuarios de prueba
-- Contraseña para todos: 123456
-- Hash bcrypt generado: $2b$10$mEdu5cGpk7f4dunqk4N8P.2af8lsjONq.jb3VYxpHzAZuP5tHKCzW

INSERT INTO `user` (`username`, `firstName`, `lastName`, `email`, `password`, `companyId`, `phone`, `metaAdAccountId`, `createdAt`, `updatedAt`) VALUES
('Cabinf', 'Cabin', 'F', 'cabinf@boostwave.com', '$2b$10$mEdu5cGpk7f4dunqk4N8P.2af8lsjONq.jb3VYxpHzAZuP5tHKCzW', @boostwave_id, '809-555-1001', 'act_1245616320222664', NOW(), NOW()),
('claudio.mayi', 'Claudio', 'Mayi', 'claudio@mayirealstate.com', '$2b$10$mEdu5cGpk7f4dunqk4N8P.2af8lsjONq.jb3VYxpHzAZuP5tHKCzW', @claudio_id, '591-555-2002', 'act_2017251745744934', NOW(), NOW()),
('adanía.user', 'Adanía', 'Usuario', 'adanía@bf.com', '$2b$10$mEdu5cGpk7f4dunqk4N8P.2af8lsjONq.jb3VYxpHzAZuP5tHKCzW', @adanía_id, '809-555-3003', 'act_1389475789461966', NOW(), NOW()),
('boostwave.user2', 'Usuario', 'Dos', 'user2@boostwave.com', '$2b$10$mEdu5cGpk7f4dunqk4N8P.2af8lsjONq.jb3VYxpHzAZuP5tHKCzW', @boostwave_id, '809-555-1002', 'act_1922449428647116', NOW(), NOW())
ON DUPLICATE KEY UPDATE `username` = VALUES(`username`);

-- Verificar datos insertados
SELECT 'Empresas creadas:' as Info;
SELECT id, name, rnc FROM `company`;

SELECT 'Usuarios creados:' as Info;
SELECT id, username, firstName, lastName, email, companyId, metaAdAccountId FROM `user`;
