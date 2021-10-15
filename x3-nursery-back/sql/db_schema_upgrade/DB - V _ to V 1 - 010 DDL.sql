--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."user_sex"
(
  "id" character varying(1) NOT NULL,
  "desc" character varying(10) NOT NULL,

  CONSTRAINT "pk___user_sex" PRIMARY KEY ("id")
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE "schema_version" (
    "schema_version" integer NOT NULL,

    CONSTRAINT "pk___schema_version" PRIMARY KEY ("schema_version")
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."org"
(
  "id" character varying(15) NOT NULL, -- SIREN (9 chars.) if applicable or other id. if not.
  "name" character varying(100) NOT NULL,

  CONSTRAINT "pk___org" PRIMARY KEY ("id")
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."app"
(
  "id" character varying(15) NOT NULL,
  "desc" character varying(100) NOT NULL,

  CONSTRAINT "pk___app" PRIMARY KEY ("id")
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."org_app"
(
  "org" character varying(15) NOT NULL,
  "app" character varying(15) NOT NULL,

  CONSTRAINT "pk___org_app" PRIMARY KEY ("org", "app"),

  CONSTRAINT "fk___org_app___org" FOREIGN KEY ("org")
      REFERENCES public."org" ("id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fk___org_app___app" FOREIGN KEY ("app")
      REFERENCES public."app" ("id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."user"
(
  "org" character varying(15) NOT NULL,
  "app" character varying(15) NOT NULL,

  "id" character varying(50) NOT NULL,

  "pwd" character varying(64), -- Password. NULLABLE, SHA-256

  "active" boolean DEFAULT true,

  "sex" character varying(1) DEFAULT 'N',

  "email" character varying(150) NOT NULL,
  "first_name" character varying(150) NOT NULL,
  "last_name" character varying(150),
  "city" character varying(150),
  "country" character varying(150),

  "created_by" character varying(50),
  "creation_date" timestamp with time zone,
  "last_modified_by" character varying(50),
  "last_modification_date" timestamp with time zone,

  CONSTRAINT "pk___user" PRIMARY KEY ("org", "app", "id"),

  CONSTRAINT "fk___user___org_app" FOREIGN KEY ("org", "app")
      REFERENCES public."org_app" ("org", "app") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fk___user___user_sex" FOREIGN KEY ("sex")
      REFERENCES public."user_sex" ("id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."role"
(
  "org" character varying(15) NOT NULL,
  "app" character varying(15) NOT NULL,

  "id" character varying(50) NOT NULL,

  "desc" character varying(100) NOT NULL,

  CONSTRAINT "pk___role" PRIMARY KEY ("org", "app", "id"),

  CONSTRAINT "fk___role___org_app" FOREIGN KEY ("org", "app")
      REFERENCES public."org_app" ("org", "app") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
--------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public."user_role"
(
  "org" character varying(15) NOT NULL,
  "app" character varying(15) NOT NULL,

  "user" character varying(20) NOT NULL,

  "role" character varying(10) NOT NULL,

  CONSTRAINT "pk___user_role" PRIMARY KEY ("org", "app", "user", "role"),

  CONSTRAINT "fk___user_role___org_app" FOREIGN KEY ("org", "app")
      REFERENCES public."org_app" ("org", "app") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fk___user_role___user" FOREIGN KEY ("org", "app", "user")
      REFERENCES public."user" ("org", "app", "id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "fk___user_role___role" FOREIGN KEY ("org", "app", "role")
      REFERENCES public."role" ("org", "app", "id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
--------------------------------------------------------------------------------------------------------------------------------------------
