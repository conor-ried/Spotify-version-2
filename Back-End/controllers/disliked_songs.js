const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const DislikedSongs = require('../models/DislikedSong');

const dislikedSongNewSchema = require('../schemas/dislikedSongNew.json');

const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { songName, artist, album } = req.body;
    const validator = jsonschema.validate(req.body, dislikedSongNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const song = await DislikedSongs.create({ songName, artist, album });
    return res.status(201).json({ song });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    const songs = await DislikedSongs.findAll();
    return res.json({ songs });
  } catch (err) {
    return next(err);
  }
});

router.get('/:songName', async function (req, res, next) {
  try {
    const song = await DislikedSongs.getByName(req.params.songName);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:songName', async function (req, res, next) {
  try {
    const song = await DislikedSongs.update(req.params.songName, req.body);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:songName', async function (req, res, next) {
  try {
    await DislikedSongs.remove(req.params.songName);
    return res.json({ deleted: req.params.songName });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;