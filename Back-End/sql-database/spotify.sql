\echo 
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE spotify;
CREATE DATABASE spotify;
\connect spotify

\i spotify-schema.sql
\i spotify-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE spotify_test;
CREATE DATABASE spotify_test;
\connect spotify_test

\i spotify-schema.sql
