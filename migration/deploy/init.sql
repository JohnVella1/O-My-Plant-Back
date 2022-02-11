BEGIN;
CREATE TABLE IF NOT EXISTS "member" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" reg_pseudo UNIQUE NOT NULL,
  "firstname" reg_firstname,
  "lastname" reg_lastname,
  "dateofbirth" DATE,
  "telephone" reg_telephone,
  "mail" reg_mail UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "profilepicture" TEXT,
  "biography" TEXT,
  "counter" INT DEFAULT 0,
  "level" TEXT,
  "role" TEXT DEFAULT 'member'
);
CREATE TABLE IF NOT EXISTS "garden" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "member_id" INTEGER NOT NULL REFERENCES "member"("id")
);
CREATE TABLE IF NOT EXISTS "plantdb" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "commonname" reg_commonname UNIQUE NOT NULL,
  "photo" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "dateadded" DATE DEFAULT NOW(),
  "member_id" INTEGER REFERENCES "member"("id")
);
CREATE TABLE IF NOT EXISTS "plantmember" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nickname" TEXT,
  "wateringfrequency" TEXT,
  "numberoftimes" INT,
  "reppoting" TEXT,
  "trimming" TEXT,
  "exposure" TEXT,
  "site" TEXT,
  "photo_member" TEXT,
  "garden_id" INTEGER NOT NULL REFERENCES "garden"("id"),
  "plantdb_id" INTEGER NOT NULL REFERENCES "plantdb"("id")
);
COMMIT;