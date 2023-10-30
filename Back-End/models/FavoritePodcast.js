const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class FavoritePodcast {
  static async create({ title, host, description }) {
    const result = await db.query(
      `INSERT INTO favorite_podcasts
         (title, host, description)
         VALUES ($1, $2, $3)
         RETURNING title, host, description`,
      [title, host, description]
    );
    const podcast = result[0];
    return podcast;
  }

  static async findAll() {
    const podcasts = await db.query(
      `SELECT title, host, description
       FROM favorite_podcasts`
    );
    return podcasts;
  }

  static async getByName(title) {
    const podcastRes = await db.query(
      `SELECT title, host, description
       FROM favorite_podcasts
       WHERE title = $1`,
      [title]
    );
    const podcast = podcastRes[0];
    return podcast;
  }
  static async findFavoritesByUserId(userId) {
    const result = await db.query(
      `SELECT p.podcast_id, p.title, p.host, p.description
       FROM favorite_podcasts p
       JOIN user_favorite_podcasts ufp ON p.podcast_id = ufp.podcast_id
       WHERE ufp.user_id = $1`,
      [userId]
    );
    console.log(result);
   
    return result;
  }

  static async addFavorite(userId, podcastId) {
    await db.query(
      `INSERT INTO user_favorite_podcasts (user_id, podcast_id)
       VALUES ($1, $2)`,
      [userId, podcastId]
    );
  }

  static async removeFavorite(userId, podcastId) {
    await db.query(
      `DELETE FROM user_favorite_podcasts
       WHERE user_id = $1 AND podcast_id = $2`,
      [userId, podcastId]
    );
  }

}

module.exports = FavoritePodcast;