-- Revert omyplant:functionPlantDb from pg

BEGIN;

DROP FUNCTION update_plantdb(json);
DROP FUNCTION add_plantdb(json);

COMMIT;
