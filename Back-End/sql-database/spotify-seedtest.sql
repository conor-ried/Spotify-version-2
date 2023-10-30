-- Insert test data into users table
INSERT INTO users (username, password, first_name, last_name, email, is_admin) 
VALUES 
('testuser1', 'testpassword1', 'Test', 'User1', 'testuser1@example.com', false),
('testuser2', 'testpassword2', 'Test', 'User2', 'testuser2@example.com', false);

-- Insert test data into songs table
INSERT INTO songs (title, artist, duration_seconds, release_year) 
VALUES 
('Test Song1', 'Test Artist1', 180, 2022),
('Test Song2', 'Test Artist2', 200, 2021);
INSERT INTO playlists (title, user_id, is_favorite) 
VALUES 
('Test Playlist1', 1, false),
('Test Playlist2', 2, true);
INSERT INTO playlist_songs (playlist_id, song_id) 
VALUES 
(1, 1),
(2, 2);

INSERT INTO user_follows (follower_id, following_id) 
VALUES 
(1, 2);

INSERT INTO favorite_podcasts (user_id, title, host, description) 
VALUES 
(1, 'Test Podcast1', 'Test Host1', 'Test Description1');

INSERT INTO disliked_songs (user_id, song_id) 
VALUES 
(1, 1);

INSERT INTO new_music_feed (artist, title, release_year, genre) 
VALUES 
('Test Artist1', 'Test Song1', 2022, 'Test Genre1');

INSERT INTO new_music_feed (artist, title, release_year, genre) 
VALUES 
('Test Artist1', 'Test Song1', 2022, 'Test Genre1');


INSERT INTO user_favorite_podcasts (user_id, podcast_id) 
VALUES 
(1, 1);


INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES 
('testUser1', 'testPass1', 'Test', 'User1', 'test1@example.com', false),
('testUser2', 'testPass2', 'Test', 'User2', 'test2@example.com', false);
INSERT INTO songs (title, artist, duration_seconds, release_year)
VALUES 
('Test Song 1', 'Test Artist 1', 300, 2020),
('Test Song 2', 'Test Artist 2', 180, 2019);

-- Adding disliked songs
INSERT INTO disliked_songs (user_id, song_id)
VALUES 
(3, 4),
(4, 3);