const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const Playlist = require('../models/Playlist');
// const authenticateJWT = require('../middleware/authMiddleware');
// const jwt = require('jsonwebtoken');
const playlistNewSchema = require('../schemas/playlistNew.json');

const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { name, username } = req.body;
    const validator = jsonschema.validate(req.body, playlistNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const playlist = await Playlist.create({ name, username });
    return res.status(201).json({ playlist });
  } catch (err) {
    return next(err);
  }
});

router.get('/playlists',  async function (req, res, next) {
  try {
    const userId = req.user.id; 
    const isAdmin = req.user.isAdmin; 
    const playlists = await Playlist.findAll(userId, isAdmin);
    console.log('Running console.log(on playlists', playlists);
    return res.json({ playlists });
  } catch (err) {
    return next(err);
  }
});

router.get('/:name', async function (req, res, next) {
  try {
    const playlist = await Playlist.getByName(req.params.name);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:name', async function (req, res, next) {
  try {
    const playlist = await Playlist.update(req.params.name, req.body);
    return res.json({ playlist });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:name', async function (req, res, next) {
  try {
    await Playlist.remove(req.params.name);
    return res.json({ deleted: req.params.name });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;