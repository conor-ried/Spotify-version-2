const jsonschema = require('jsonschema');
const express = require('express');
const { BadRequestError } = require('../expressError');
const NewMusicFeed = require('../models/NewMusicFeed');

const newMusicFeedNewSchema = require('../schemas/newMusicFeedNew.json');

const router = new express.Router();



router.get('/', async function (req, res, next) {
  try {
    const songs = await NewMusicFeed.findAll();
    return res.json({ songs });
  } catch (err) {
    return next(err);
  }
});



router.get('/:genre', async function (req, res, next) {
  try {
    const song = await NewMusicFeed.getByGenre(req.params.genre);
    return res.json({ song });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;