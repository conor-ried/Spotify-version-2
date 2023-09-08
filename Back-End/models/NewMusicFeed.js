const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class NewMusicFeed {
  static async create({ title, artist, releaseDate }) {
    const result = await db.query(
      `INSERT INTO newmusicfeeds
         (title, artist, releaseDate)
         VALUES ($1, $2, $3)
         RETURNING title, artist, releaseDate`,
      [title, artist, releaseDate]
    );
    const song = result[0];
    return song;
  }

  static async findAll() {
    const songs = await db.query(
      `SELECT title, artist, releaseDate
       FROM newmusicfeeds`
    );
    return songs;
  }

  static async getByTitle(title) {
    const songRes = await db.query(
      `SELECT title, artist, releaseDate
       FROM newmusicfeeds
       WHERE title = $1`,
      [title]
    );
    const song = songRes[0];
    return song;
  }

  static async update(title, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: 'title',
      artist: 'artist'
    });
    const titleVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE newmusicfeeds 
                      SET ${setCols} 
                      WHERE title = ${titleVarIdx} 
                      RETURNING title, artist, releaseDate`;
    const result = await db.query(querySql, [...values, title]);
    const song = result[0];
    return song;
  }

  static async remove(title) {
    const result = await db.query(
      `DELETE
       FROM newmusicfeeds
       WHERE title = $1
       RETURNING title`,
      [title]
    );
    const song = result[0];
    return song;
  }
}

module.exports = NewMusicFeed;