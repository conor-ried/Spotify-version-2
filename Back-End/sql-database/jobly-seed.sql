INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES
  ('user1', 'password1', 'John', 'Doe', 'user1@example.com', false),
  ('user2', 'password2', 'Jane', 'Smith', 'user2@example.com', false),
  ('admin', 'adminpassword', 'Admin', 'User', 'admin@example.com', true);


INSERT INTO songs (title, artist, duration_seconds, release_year)
VALUES
  ('Song 1', 'Artist A', 240, 2000),
  ('Song 2', 'Artist B', 180, 1995),
  ('Song 3', 'Artist C', 210, 2005),
  ('Song 4', 'Artist D', 195, 2010),
  ('Song 5', 'Artist E', 220, 2020);

-- Insert data into the 'playlists' table
INSERT INTO playlists (title, user_id, is_favorite)
VALUES
  ('My Playlist', 1, true),
  ('Workout Mix', 2, false),
  ('Chill Vibes', 1, true),
  ('Road Trip Tunes', 3, false);

-- Insert data into the 'playlist_songs' table (relationship between playlists and songs)
INSERT INTO playlist_songs (playlist_id, song_id)
VALUES
  (5, 1), -- Song 1 in My Playlist
  (6, 2), -- Song 2 in My Playlist
  (7, 2), -- Song 2 in Workout Mix
  (5, 4), -- Song 3 in Workout Mix
  (8, 3), -- Song 4 in Chill Vibes
  (8, 1), -- Song 5 in Chill Vibes
  (8, 2), -- Song 1 in Road Trip Tunes
  (5, 3); -- Song 3 in Road Trip Tunes

-- Insert data into the 'user_follows' table (relationship between users)
INSERT INTO user_follows (follower_id, following_id)
VALUES
  (1, 2), -- User 1 follows User 2
  (2, 1), -- User 2 follows User 1
  (3, 1), -- User 3 follows User 1
  (3, 2); -- User 3 follows User 2

-- Insert data into the 'favorite_podcasts' table
INSERT INTO favorite_podcasts (user_id, title, host, description)
VALUES
  (1, 'Tech Podcast', 'Host X', 'Tech-related discussions'),
  (2, 'Science Podcast', 'Host Y', 'Science news and discoveries'),
  (3, 'Comedy Podcast', 'Host Z', 'Laughs and humor');
  (35, 'Comedy Podcast', 'Host Z', 'Laughs and humor');

-- Insert data into the 'disliked_songs' table (songs that users dislike)
INSERT INTO disliked_songs (user_id, song_id)
VALUES
  (1, 3), -- User 1 dislikes Song 3
  (2, 4), -- User 2 dislikes Song 4
  (3, 1); -- User 3 dislikes Song 1

-- Insert data into the 'new_music_feed' table (recently added songs)
INSERT INTO new_music_feed (user_id, song_id)
VALUES
  (1, 1), -- User 1 sees Song 5 in their feed
  (2, 2), -- User 2 sees Song 6 in their feed
  (3, 3);


  INSERT INTO artist_genres (artist, genre) VALUES ('Beatles', 'Rock');
INSERT INTO artist_genres (artist, genre) VALUES ('Beatles', 'Pop');
INSERT INTO artist_genres (artist, genre) VALUES ('Portugal the Man', 'Alternative');
INSERT INTO artist_genres (artist, genre) VALUES ('Portugal the Man', 'Indie');


INSERT INTO songs (title, artist, duration_seconds, release_year)
VALUES
  ('Feel It Still', 'Portugal the Man', 210, 2017),
  ('Purple Yellow Red & Blue', 'Portugal the Man', 220, 2013);



  INSERT INTO songs (title, artist, duration_seconds, release_year)
VALUES
  ('Help!', 'Beatles', 180, 1965),
  ('A Hard Day''s Night', 'Beatles', 190, 1964);