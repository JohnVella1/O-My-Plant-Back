-- Verify omyplant:init on pg

BEGIN;

SELECT * FROM plantmember WHERE false;
SELECT * FROM garden WHERE false;
SELECT * FROM member WHERE false;
SELECT * FROM plantdb WHERE false;

ROLLBACK;
