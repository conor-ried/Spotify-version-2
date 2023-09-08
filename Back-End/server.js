require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
const usersRoutes = require('./controllers/users');
const songsRoutes = require('./controllers/songs');
const playlistsRoutes = require('./controllers/playlists');
const newmusicfeedsRoutes = require('./controllers/newmusicfeeds');
const favoritepodcastsRoutes = require('./controllers/favoritepodcasts');

// Mount user routes under the '/users' base path
app.use('/users', usersRoutes);
app.use('/songs', songsRoutes);
app.use('/playlists', playlistsRoutes);
app.use('/newmusicfeeds', newmusicfeedsRoutes);
app.use('/favoritepodcasts', favoritepodcastsRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});