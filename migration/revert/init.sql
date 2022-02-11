-- Revert omyplant:init from pg

BEGIN;

DROP TABLE plantmember, garden, plantdb, member;

COMMIT;
