-- Revert omyplant:functionMember from pg

BEGIN;

DROP FUNCTION update_member(json);
DROP FUNCTION add_member(json);

COMMIT;
