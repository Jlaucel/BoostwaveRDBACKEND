-- Actualizar usuario Cabinf existente
UPDATE `user` SET 
    `metaAdAccountId` = 'act_1245616320222664',
    `firstName` = 'Cabin',
    `lastName` = 'F',
    `email` = 'cabinf@boostwave.com',
    `phone` = '809-555-1001',
    `companyId` = 6
WHERE `username` = 'Cabinf';

SELECT 'Usuario Cabinf actualizado:' as Info;
SELECT id, username, firstName, lastName, email, companyId, metaAdAccountId FROM `user` WHERE `username` = 'Cabinf';
