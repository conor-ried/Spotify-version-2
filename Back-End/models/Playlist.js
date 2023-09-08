const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Playlist {
  static async create({ title, owner, songs }) {
    const result = await db.query(
      `INSERT INTO playlists
         (title, owner, songs)
         VALUES ($1, $2, $3)
         RETURNING title, owner, songs`,
      [title, owner, songs]
    );
    const playlist = result[0];
    return playlist;
  }

  static async findAll(userId, isAdmin) {
    let query;
    let values = [userId];

    if (isAdmin) {
      query = `
        SELECT title, owner, songs
        FROM playlists`;
      values = [];
    } else {
      query = `
        SELECT p.title, p.owner, p.songs
        FROM playlists AS p
        WHERE p.user_id = $1
        UNION
        SELECT p.title, p.owner, p.songs
        FROM playlists AS p
        INNER JOIN follows AS f ON p.user_id = f.follows_id
        WHERE f.user_id = $1`;
    }
    console.log("in model running console.log on query",query);

    const playlists = await db.query(query, values);
    return playlists;
  }

  static async getByTitle(title) {
    const playlistRes = await db.query(
      `SELECT title, owner, songs
       FROM playlists
       WHERE title = $1`,
      [title]
    );
    const playlist = playlistRes[0];
    return playlist;
  }

  static async update(title, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: 'title',
      owner: 'owner'
    });
    const titleVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE playlists 
                      SET ${setCols} 
                      WHERE title = ${titleVarIdx} 
                      RETURNING title, owner, songs`;
    const result = await db.query(querySql, [...values, title]);
    const playlist = result[0];
    return playlist;
  }

  static async remove(title) {
    const result = await db.query(
      `DELETE
       FROM playlists
       WHERE title = $1
       RETURNING title`,
      [title]
    );
    const playlist = result[0];
    return playlist;
  }
}

module.exports = Playlist;