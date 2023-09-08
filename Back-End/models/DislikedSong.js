const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class DislikedSong {
  static async create({ songName, artist, album }) {
    const result = await db.query(
      `INSERT INTO dislikedsongs
         (songName, artist, album)
         VALUES ($1, $2, $3)
         RETURNING songName, artist, album`,
      [songName, artist, album]
    );
    const song = result[0];
    return song;
  }

  static async findAll() {
    const songs = await db.query(
      `SELECT songName, artist, album
       FROM dislikedsongs`
    );
    return songs;
  }

  static async getByName(songName) {
    const songRes = await db.query(
      `SELECT songName, artist, album
       FROM dislikedsongs
       WHERE songName = $1`,
      [songName]
    );
    const song = songRes[0];
    return song;
  }

  static async update(songName, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      songName: 'songName',
      artist: 'artist',
      album: 'album'
    });
    const songNameVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE dislikedsongs 
                      SET ${setCols} 
                      WHERE songName = ${songNameVarIdx} 
                      RETURNING songName, artist, album`;
    const result = await db.query(querySql, [...values, songName]);
    const song = result[0];
    return song;
  }

  static async remove(songName) {
    const result = await db.query(
      `DELETE
       FROM dislikedsongs
       WHERE songName = $1
       RETURNING songName`,
      [songName]
    );
    const song = result[0];
    return song;
  }
}

module.exports = DislikedSong;