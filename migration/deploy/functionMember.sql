BEGIN;

CREATE FUNCTION add_member(json) RETURNS "member" AS $$
    INSERT INTO "member" ("pseudo", "firstname", "lastname", "mail", "password", "profilepicture", "biography", "level", "role", "dateofbirth", "telephone", "counter")
        VALUES (
        $1 ->> 'pseudo',
        $1 ->> 'firstname',
        $1 ->> 'lastname',
        $1 ->> 'mail',
        $1 ->> 'password',
        $1 ->> 'profilepicture',
        $1 ->> 'biography',
        $1 ->> 'level',
        $1 ->> 'role',
        ($1->>'dateofbirth')::DATE,
        $1->>'telephone',
        ($1->>'counter')::INT
        )
    RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_member(json) RETURNS "member" AS $$
    UPDATE "member" SET
        "pseudo"=$1 ->> 'pseudo',
        "firstname"=$1 ->> 'firstname',
        "lastname"=$1 ->> 'lastname',
        "mail"=$1 ->> 'mail',
        "password"=$1 ->> 'password',
        "profilepicture"=$1 ->> 'profilepicture',
        "biography"=$1 ->> 'biography',
        "level"=$1 ->> 'level',
        "role"=$1 ->> 'role',
        "dateofbirth"=($1->> 'dateofbirth')::DATE,
        "telephone"=$1 ->> 'telephone',
        "counter"=($1->> 'counter')::int
    WHERE id=($1->>'id')::int
    RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;