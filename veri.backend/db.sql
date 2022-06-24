CREATE DATABASE IF NOT EXISTS veriadmin

CREATE TABLE IF NOT EXISTS veriadmin.addresses
(
	token_id bigint NOT NULL,
    address character(36) COLLATE pg_catalog."default" NOT NULL,
    session character varying(2048) COLLATE pg_catalog."default" NULL,
    CONSTRAINT addresses_pkey PRIMARY KEY (token_id, address)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS veriadmin.addresses
    OWNER to tezos;