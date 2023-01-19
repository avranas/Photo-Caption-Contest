CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username text,
  password text
);

CREATE TABLE images(
  id SERIAL PRIMARY KEY,
  image_location text
);

CREATE TABLE captions(
  id SERIAL PRIMARY KEY,
  image_id int,
  user_id int,
  caption text,
  created_at date,
  updated_at date,
  time bigint,
  FOREIGN KEY ("user_id") REFERENCES images(id),
  FOREIGN KEY ("image_id") REFERENCES images(id)
);

