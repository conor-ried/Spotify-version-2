CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE songs (
  song_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  duration_seconds INTEGER CHECK (duration_seconds >= 0),
  release_year INTEGER
);

-- Table for Playlists
CREATE TABLE playlists (
  playlist_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE
);

-- Table for Playlist-Song Relationship
CREATE TABLE playlist_songs (
  playlist_id INTEGER REFERENCES playlists(playlist_id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(song_id) ON DELETE CASCADE,
  PRIMARY KEY (playlist_id, song_id)
);

-- Table for Following Relationships
CREATE TABLE user_follows (
  follower_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  following_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  PRIMARY KEY (follower_id, following_id)
);

-- Table for Favorite Podcasts
CREATE TABLE favorite_podcasts (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  podcast_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  host TEXT,
  description TEXT
);

-- Table for Disliked Songs
CREATE TABLE disliked_songs (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(song_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, song_id)
);

-- Table for New Music Feed
CREATE TABLE new_music_feed (
  song_id SERIAL PRIMARY KEY,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  release_year INTEGER,
  genre TEXT,
  date_added TIMESTAMP DEFAULT NOW()
); 


CREATE TABLE artist_genres (
  artist TEXT NOT NULL,
  genre TEXT NOT NULL,
  PRIMARY KEY (artist, genre)
);

CREATE TABLE user_favorite_podcasts (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  podcast_id INTEGER REFERENCES favorite_podcasts(podcast_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, podcast_id)
);



CREATE TRIGGER new_music_feed_trigger
AFTER INSERT ON songs
FOR EACH ROW
EXECUTE FUNCTION update_new_music_feed();


CREATE OR REPLACE FUNCTION update_new_music_feed()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert data into the new_music_feed table
  INSERT INTO new_music_feed (artist, title, release_year, genre, date_added)
  SELECT NEW.artist, NEW.title, s.release_year, ag.genre, NOW()
  FROM artist_genres ag
  JOIN songs s ON s.artist = NEW.artist
  WHERE ag.artist = NEW.artist;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;