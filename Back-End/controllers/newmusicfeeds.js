const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const NewMusicFeed = require('../models/NewMusicFeed');

const newMusicFeedNewSchema = require('../schemas/newMusicFeedNew.json');

const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { songName, artist, releaseDate } = req.body;
    const validator = jsonschema.validate(req.body, newMusicFeedNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const song = await NewMusicFeed.create({ songName, artist, releaseDate });
    return res.status(201).json({ song });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    const songs = await NewMusicFeed.findAll();
    return res.json({ songs });
  } catch (err) {
    return next(err);
  }
});

router.get('/:songName', async function (req, res, next) {
  try {
    const song = await NewMusicFeed.getByName(req.params.songName);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:songName', async function (req, res, next) {
  try {
    const song = await NewMusicFeed.update(req.params.songName, req.body);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:songName', async function (req, res, next) {
  try {
    await NewMusicFeed.remove(req.params.songName);
    return res.json({ deleted: req.params.songName });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;