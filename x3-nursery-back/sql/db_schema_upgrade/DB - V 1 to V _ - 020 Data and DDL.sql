--------------------------------------------------------------------------------------------------------------------------------------------
ALTER TABLE public."user_role" DROP CONSTRAINT IF EXISTS "fk___user_role___org_app";
ALTER TABLE public."user_role" DROP CONSTRAINT IF EXISTS "fk___user_role___user";
ALTER TABLE public."user_role" DROP CONSTRAINT IF EXISTS "fk___user_role___role";
DROP TABLE IF EXISTS public."user_role";

ALTER TABLE public."role" DROP CONSTRAINT IF EXISTS "fk___role___org_app";
DROP TABLE IF EXISTS public."role";

ALTER TABLE public."user" DROP CONSTRAINT IF EXISTS "fk___user___org_app";
ALTER TABLE public."user" DROP CONSTRAINT IF EXISTS "fk___user___user_sex";
DROP TABLE IF EXISTS public."user";

ALTER TABLE public."org_app" DROP CONSTRAINT IF EXISTS "fk___org_app___org";
ALTER TABLE public."org_app" DROP CONSTRAINT IF EXISTS "fk___org_app___app";
DROP TABLE IF EXISTS public."org_app";

DROP TABLE IF EXISTS public."org";

DROP TABLE IF EXISTS public."app";

DROP TABLE IF EXISTS public."schema_version";

DROP TABLE IF EXISTS public."user_sex";
--------------------------------------------------------------------------------------------------------------------------------------------
