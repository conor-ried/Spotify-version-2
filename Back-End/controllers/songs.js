const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const songNewSchema = require('../schemas/songNew.json');
const songUpdateSchema = require('../schemas/songUpdate.json');

const router = new express.Router();
const { authenticateJWT } = require('../middleware/auth');


router.post('/', async function (req, res, next) {
  try {
    const request = req.body;
    
    
    const validator = jsonschema.validate(request, songNewSchema);
    if (!request.title && !request.artist) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    console.log(req);

    const song = await Song.create(request);
    console.log('Song model posting song', song);
    return res.status(201).json({ song });
  } catch (err) {
    return next(err);
  }
});

// Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMTAwMDAwIiwiaWF0IjoxNjk1Nzc2ODI4fQ.Rb_c0urf1nrb2iZ-_lvLcGq9bEdhV7ri6ql1YoDu5No
router.get('/',authenticateJWT, async function (req, res, next) {
  try {
    const songs = await Song.findAll();
    console.log(songs);
    console.log("result of console log songs" , songs);
    console.log('Songs Data:', songs);
    return res.json({ songs });
  } catch (err) {
    return next(err);
  }
});

router.get('/:song_id', async function (req, res, next) {
  try {
    const song = await Song.getById(req.params.song_id);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:song_id', async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, songUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const song = await Song.update(req.params.song_id, req.body);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:song_id', async function (req, res, next) {
  try {
    await Song.remove(req.params.song_id);
    return res.json({ deleted: req.params.song_id });
  } catch (err) {
    return next(err);
  }
});
router.post('/:song_id/add-to-playlist', authenticateJWT, async function (req, res, next) {
  try {
    // Extract the song ID from the URL parameter
    const { song_id } = req.params;
    // Extract the playlist information from the request body
    const { playlistTitle } = req.body;

    // Ensure the song exists
    const song = await Song.getById(song_id);
    if (!song) {
      throw new BadRequestError('Song not found');
    }

    // Ensure the playlist exists
    const playlist = await Playlist.getByTitle(playlistTitle);
    if (!playlist) {
      throw new BadRequestError('Playlist not found');
    }

    // Add the song to the playlist
    await Playlist.addSong(playlistTitle, song_id);

    // Send a successful response
    res.status(200).json({ message: 'Song added to playlist successfully' });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:song_id/remove-from-playlist', authenticateJWT, async function (req, res, next) {
  try {
    // Extract the song ID from the URL parameter
    const { song_id } = req.params;
    // Extract the playlist information from the request body
    const { playlistTitle } = req.body;

    // Ensure the song exists by attempting to retrieve it
    const song = await Song.getById(song_id);
    if (!song) {
      throw new BadRequestError('Song not found');
    }

    // Ensure the playlist exists by attempting to retrieve it
    const playlist = await Playlist.getByTitle(playlistTitle);
    if (!playlist) {
      throw new BadRequestError('Playlist not found');
    }

    // Remove the song from the playlist
    await Playlist.removeSong(playlistTitle, song_id);

    // Send a successful response
    res.status(200).json({ message: 'Song removed from playlist successfully' });
  } catch (err) {
    return next(err);
  }
});
module.exports = router;