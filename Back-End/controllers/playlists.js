const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const Playlist = require('../models/Playlist');
// const authenticateJWT = require('../middleware/authMiddleware');
// const jwt = require('jsonwebtoken');
const playlistNewSchema = require('../schemas/playlistNew.json');
const playlistUpdateSchema = require('../schemas/playlistUpdate.json');
const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { title, user_id } = req.body; // Extract title and user_id from the request body
    console.log(req.body);

    // Validate the request body using the schema
    const validator = jsonschema.validate({ title, user_id }, playlistNewSchema);

    // Check if the validation failed
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    // Create a new playlist using the provided data
    const playlist = await Playlist.create({ title, user_id }); // Pass title and user_id as separate arguments
    
    // Return a success response with the created playlist
    return res.status(201).json({ playlist });
  } catch (err) {
    // Pass the error to the error handling middleware
    return next(err);
  }
});

router.get('/',  async function (req, res, next) {
  try {

    const playlists = await Playlist.findAll();
    console.log('Running console.log(on playlists in the backend man Line 40', playlists);
    return res.json({ playlists });
  } catch (err) {
    return next(err);
  }
});

router.get('/:title', async function (req, res, next) {
  try {
    const playlist = await Playlist.getByTitle(req.params.title);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:title', async function (req, res, next) {
  try {
    // Validate the request body using the schema
    const validator = jsonschema.validate(req.body, playlistUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const playlist = await Playlist.update(req.params.title, req.body);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});



router.delete('/:title', async function (req, res, next) {
  try {
    await Playlist.remove(req.params.title);
    return res.json({ deleted: req.params.title});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;