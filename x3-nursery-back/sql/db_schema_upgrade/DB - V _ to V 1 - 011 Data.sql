--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."user_sex" ("id", "desc") values('F', 'Female');
INSERT INTO public."user_sex" ("id", "desc") values('M', 'Male');
INSERT INTO public."user_sex" ("id", "desc") values('N', 'None/Other');
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."schema_version" values(1);
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."org" ("id", "name") values('X3', 'X3//entz');
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."app" ("id", "desc") values('X3-NURSERY', 'X3 Nursery');
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."org_app" ("org", "app") values('X3', 'X3-NURSERY');
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."user" ("org", "app", "id", "email", "first_name") values('X3', 'X3-NURSERY', 'SUPERADMIN', 'superadmin@x3.com', 'Super-administrateur');
INSERT INTO public."user" ("org", "app", "id", "email", "first_name") values('X3', 'X3-NURSERY', 'ADMIN', 'admin@x3.com', 'Administrateur');
INSERT INTO public."user" ("org", "app", "id", "email", "first_name") values('X3', 'X3-NURSERY', 'POWER-USER', 'power-user@x3.com', 'Power-user');
INSERT INTO public."user" ("org", "app", "id", "email", "first_name") values('X3', 'X3-NURSERY', 'USER', 'user@x3.com', 'User');
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."role" ("org", "app", "id", "desc") values('X3', 'X3-NURSERY', 'SUPERADMIN', 'Super-administrateur');
INSERT INTO public."role" ("org", "app", "id", "desc") values('X3', 'X3-NURSERY', 'ADMIN', 'Administrateur');
INSERT INTO public."role" ("org", "app", "id", "desc") values('X3', 'X3-NURSERY', 'POWER-USER', 'Utilisateur avec pouvoir');
INSERT INTO public."role" ("org", "app", "id", "desc") values('X3', 'X3-NURSERY', 'USER', 'Utilisateur de base');
--------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO public."user_role" ("org", "app", "user", "role") values('X3', 'X3-NURSERY', 'SUPERADMIN', 'SUPERADMIN');
INSERT INTO public."user_role" ("org", "app", "user", "role") values('X3', 'X3-NURSERY', 'ADMIN', 'ADMIN');
INSERT INTO public."user_role" ("org", "app", "user", "role") values('X3', 'X3-NURSERY', 'POWER-USER', 'POWER-USER');
INSERT INTO public."user_role" ("org", "app", "user", "role") values('X3', 'X3-NURSERY', 'USER', 'USER');
--------------------------------------------------------------------------------------------------------------------------------------------
