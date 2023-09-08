const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const Song = require('../models/Song');

const songNewSchema = require('../schemas/songNew.json');
const songUpdateSchema = require('../schemas/songUpdate.json');

const router = new express.Router();

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

router.get('/', async function (req, res, next) {
  try {
    const songs = await Song.findAll();
    console.log(songs);
    console.log("result of console log songs" , songs);
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

module.exports = router;