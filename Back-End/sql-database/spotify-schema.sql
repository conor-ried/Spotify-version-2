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
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(song_id) ON DELETE CASCADE,
  date_added TIMESTAMP DEFAULT NOW()
); 