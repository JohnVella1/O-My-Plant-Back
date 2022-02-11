-- Deploy omyplant:functionPlantDb to pg

BEGIN;

CREATE FUNCTION add_plantdb(json) RETURNS "plantdb" AS $$
    INSERT INTO "plantdb" ("commonname", "photo", "description", "member_id")
        VALUES (
            $1 ->> 'commonname',
            $1 ->> 'photo',
            $1 ->> 'description',
            ($1 ->> 'member_id')::INT
            )
        RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_plantdb(json) RETURNS "plantdb" AS $$
        UPDATE "plantdb" SET
        "commonname"=$1 ->> 'commonname',
        "photo"=$1 ->> 'photo',
        "description"=$1 ->> 'description',
        "dateadded"=($1 ->> 'dateadded')::date
        WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
