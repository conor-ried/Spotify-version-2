const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const DislikedSongs = require('../models/DislikedSong');

const dislikedSongNewSchema = require('../schemas/dislikedSongNew.json');

const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { userId, songId } = req.body;
    const validator = jsonschema.validate(req.body, dislikedSongNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const song = await DislikedSongs.create({ userId, songId });
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

router.get('/:songName', async (req, res) => {
  try {
    const songName = req.params.songName;
    const dislikedSongs = await DislikedSongs.getByName(songName);

    if (dislikedSongs === null) {
      return res.status(500).send('An error occurred');
    }

    if (dislikedSongs.length === 0) {
      return res.status(404).send('No disliked entries found for this song');
    }

    return res.json(dislikedSongs);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});



module.exports = router;