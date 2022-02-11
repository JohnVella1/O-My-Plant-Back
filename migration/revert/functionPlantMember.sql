-- Revert omyplant:functionPlantMember from pg

BEGIN;

DROP FUNCTION update_plantmember(json);
DROP FUNCTION add_plantmember(json);

COMMIT;
