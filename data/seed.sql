BEGIN;

insert into member ("pseudo", "firstname", "lastname", "dateofbirth", "telephone", "mail", "password") values ('Larine Mulvey', 'Lài', 'Mulvey', '1995-06-22', 1285637087, 'lmulvey0@hibu.com', 'TNC2YmGQ');
insert into member ("pseudo", "mail", "password") values ('lolo', 'lolo@gmail.com', '$2b$10$pij/EOM3R0mkeMVeWizUtuDMjuvxWU6MsSqqQyGSOCytxFDyESRte');

 insert into garden ("member_id") VALUES(1)
 
insert into plantdb ("commonname", "photo", "description", "member_id") values
 ('Buis', 'https://res.cloudinary.com/dtnoanxmt/image/upload/v1643378630/photo-1520412099551-62b6bafeb5bb_h6lepk.jpg', 'Une belle plante verte', 3);
 insert into plantmember ("nickname", "wateringfrequency", "numberoftimes", "reppoting", "trimming","exposure", "site", "photo_member", "garden_id", "plantdb_id") values
 ('lichen', 'semaine', 2, 'Mars', 'Juillet', 'Fort', 'balcon', 'photo', 1, 1);
COMMIT;

Select * from plantdb left join plantmember on plantdb.id = plantmember.id WHERE garden_id = 9 AND plantmember.id = 2