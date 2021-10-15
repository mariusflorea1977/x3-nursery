----------------------------------------------------------------------
CREATE SEQUENCE public.test_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 761
  CACHE 1;

DROP TABLE public.test;

CREATE TABLE public.test
(
  id integer NOT NULL DEFAULT nextval('test_id_seq'::regclass),
  "testVal" character varying(1500),
  "boolean" boolean DEFAULT true,
  "date" timestamp with time zone,
  CONSTRAINT test_pkey PRIMARY KEY (id)
);
----------------------------------------------------------------------
INSERT INTO test ("testVal") VALUES('Hello World !...');
----------------------------------------------------------------------
