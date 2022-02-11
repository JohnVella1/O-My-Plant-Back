-- Deploy omyplant:functionPlantMember to pg

BEGIN;

CREATE FUNCTION add_plantmember(json) RETURNS "plantmember" AS $$
INSERT INTO "plantmember" ("garden_id", "plantdb_id")
VALUES (
($1 ->> 'garden_id')::int,
($1 ->> 'plantdb_id')::int
)
RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_plantmember(json) RETURNS "plantmember" AS $$
    UPDATE "plantmember" SET
    "nickname"=$1 ->> 'nickname',
    "wateringfrequency"=$1 ->> 'wateringfrequency',
    "reppoting"=$1 ->> 'reppoting',
    "trimming"=$1 ->> 'trimming',
    "exposure"=$1 ->> 'exposure',
    "site"=$1 ->> 'site',
    "photo_member"=$1 ->> 'photo_member',
    "numberoftimes"=($1 ->> 'numberoftimes')::int
    WHERE id=($1->>'id')::int
RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;