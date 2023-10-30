const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const FavoritePodcast = require('../models/FavoritePodcast');

const favoritePodcastNewSchema = require('../schemas/favoritePodcastNew.json');

const router = new express.Router();

router.post('/', async function (req, res, next) {
  try {
    const { title, host, description } = req.body;
    const validator = jsonschema.validate(req.body, favoritePodcastNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const podcast = await FavoritePodcast.create({ title, host, description });
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

router.get('/:title', async function (req, res, next) {
  try {
    const podcast = await FavoritePodcast.getByName(req.params.title);
    return res.json({ podcast });
  } catch (err) {
    return next(err);
  }
});


router.get('/favorites/:userId', async function (req, res, next) {
  try {
    const podcasts = await FavoritePodcast.findFavoritesByUserId(req.params.userId);
    return res.json({ podcasts });
  } catch (err) {
    return next(err);
  }
});

router.post('/favorites/:userId/:podcastId', async function (req, res, next) {
  try {
    await FavoritePodcast.addFavorite(req.params.userId, req.params.podcastId);
    return res.status(201).json({ status: 'Added to favorites' });
  } catch (err) {
    return next(err);
  }
});

router.delete('/favorites/:userId/:podcastId', async function (req, res, next) {
  try {
    await FavoritePodcast.removeFavorite(req.params.userId, req.params.podcastId);
    return res.json({ status: 'Removed from favorites' });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;