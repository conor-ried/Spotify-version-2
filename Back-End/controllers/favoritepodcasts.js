const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const FavoritePodcast = require('../models/FavoritePodcast');

const favoritePodcastNewSchema = require('../schemas/favoritePodcastNew.json');

const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { podcastName, creator, releaseDate } = req.body;
    const validator = jsonschema.validate(req.body, favoritePodcastNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const podcast = await FavoritePodcast.create({ podcastName, creator, releaseDate });
    return res.status(201).json({ podcast });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    const podcasts = await FavoritePodcast.findAll();
    return res.json({ podcasts });
  } catch (err) {
    return next(err);
  }
});

router.get('/:podcastName', async function (req, res, next) {
  try {
    const podcast = await FavoritePodcast.getByName(req.params.podcastName);
    return res.json({ podcast });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:podcastName', async function (req, res, next) {
  try {
    const podcast = await FavoritePodcast.update(req.params.podcastName, req.body);
    return res.json({ podcast });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:podcastName', async function (req, res, next) {
  try {
    await FavoritePodcast.remove(req.params.podcastName);
    return res.json({ deleted: req.params.podcastName });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;