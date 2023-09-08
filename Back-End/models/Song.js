const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Song {
  static async create({ title, artist, duration_seconds, release_year }) {
    const result = await db.query(
      `INSERT INTO songs
         (title, artist, duration_seconds, release_year)
         VALUES ($1, $2, $3, $4)
         RETURNING title, artist, duration_seconds, release_year, song_id`,
      [title, artist, duration_seconds, release_year]
    );
    console.log("In model run of result", result);
    console.log("In model run of result.rows[0]", result[0]);
    const song = result[0];
    return song;
  }
  static async findAllForAdmin() {
    const playlists = await db.query(
      `SELECT title, owner, songs
       FROM playlists`
    );
    return playlists;
  }

  static async findAll() {
    const songs = await db.query(
      `SELECT song_id, title, artist, duration_seconds, release_year
       FROM songs`
    );
    console.log(songs);
    return songs;
  }

  static async getById(song_id) {
    const songRes = await db.query(
      `SELECT song_id, title, artist, duration_seconds, release_year
       FROM songs
       WHERE song_id = $1`,
      [song_id]
    );
    console.log("SongRes in models", songRes);
    console.log("SongRes[0] in models", songRes[0]);
  
    if (!songRes[0]) throw new NotFoundError(`No song with id: ${song_id}`);
    return songRes[0];
  }

  static async update(song_id, data) {
    console.log(data);
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: 'title',
      artist: 'artist',
      // ,
      // duration_seconds: 'duration_seconds',
      // release_year: 'release_year'
    });
    const songIdVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE songs 
                      SET ${setCols} 
                      WHERE song_id = ${songIdVarIdx} 
                      RETURNING song_id, title, artist, duration_seconds, release_year`;
    const result = await db.query(querySql, [...values, song_id]);
    console.log(result);
    const song = result[0];
    if (!song) throw new NotFoundError(`No song with id: ${song_id}`);
    return song;
  }

  static async remove(song_id) {
    const result = await db.query(
      `DELETE
       FROM songs
       WHERE song_id = $1
       RETURNING song_id`,
      [song_id]
    );
    const song = result[0]; // Define 'song' here
    console.log(song);
    console.log(result[0]);
    return song;
  }
}

module.exports = Song;