require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
let PORT = process.env.PORT || 3002;

const SECRET_KEY = process.env.JWT_SECRET;
if (process.env.NODE_ENV === 'test') {
  PORT = 3002;
}

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

const usersRoutes = require('./controllers/users');
const songsRoutes = require('./controllers/songs');
const playlistsRoutes = require('./controllers/playlists');
const newmusicfeedsRoutes = require('./controllers/newmusicfeeds');
const favoritepodcastsRoutes = require('./controllers/favoritepodcasts');
const dislikedSongsRoutes = require('./controllers/disliked_songs');

// Mount user routes under the respective base paths
app.use('/users', usersRoutes);
app.use('/songs', songsRoutes);
app.use('/playlists', playlistsRoutes);
app.use('/newmusicfeeds', newmusicfeedsRoutes);
app.use('/favoritepodcasts', favoritepodcastsRoutes);
app.use('/dislikedSongs', dislikedSongsRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

console.log('Current user:', process.env.USER);
console.log('Current user:', process.env.user);
console.log("Loaded JWT_SECRET line 42 server.js:", SECRET_KEY);
// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };


