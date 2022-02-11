-- Deploy omyplant:regex to pg

BEGIN;

CREATE DOMAIN reg_pseudo AS TEXT
CHECK(VALUE ~ '^[a-zA-Z0-9\-\_]{1,30}$');

CREATE DOMAIN reg_firstname AS TEXT
CHECK(VALUE ~ '^.{1,30}$');

CREATE DOMAIN reg_lastname AS TEXT
CHECK(VALUE ~ '^.{1,30}$');

CREATE DOMAIN reg_telephone AS TEXT
CHECK(VALUE ~ '^([0]{1})([0-9]{9})$');

CREATE DOMAIN reg_mail AS TEXT
CHECK(VALUE ~ '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');

CREATE DOMAIN reg_commonname AS TEXT
CHECK(VALUE ~ '^.{1,30}$');

CREATE DOMAIN reg_nickname AS TEXT
CHECK(VALUE ~ '^[a-zA-Z0-9\-\_]{1,30}$');

COMMIT;
