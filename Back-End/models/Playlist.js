const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Playlist {
  static async create({ title, user_id }) {
    const result = await db.query(
      `INSERT INTO playlists
         (title, user_id)
         VALUES ($1, $2)
         RETURNING title, user_id`,
      [title, user_id]
    );
    const playlist = result[0];
    return playlist;
  }

  static async findAll() {
    const query = `
    SELECT
      p.title AS playlist_title,
      u.username AS user_username,
      s.title AS song_title,
      s.artist AS song_artist
    FROM
      playlists AS p
    JOIN
      users AS u ON p.user_id = u.user_id
    LEFT JOIN
      playlist_songs AS ps ON p.playlist_id = ps.playlist_id
    LEFT JOIN
      songs AS s ON ps.song_id = s.song_id`;

  const playlists = await db.query(query);
    return playlists;
  }

  static async getByTitle(title) {
    const playlistRes = await db.query(
      `SELECT 
        p.title AS playlist_title,
        u.username AS user_username,
        s.title AS song_title,
        s.artist AS song_artist
      FROM
        playlists AS p
      JOIN
        users AS u ON p.user_id = u.user_id
      LEFT JOIN
        playlist_songs AS ps ON p.playlist_id = ps.playlist_id
      LEFT JOIN
        songs AS s ON ps.song_id = s.song_id
      WHERE p.title = $1`,
      [title]
    );
    console.log('this is playlists log from line 56 on backend', playlistRes);
    const playlist = {
      playlist_title: playlistRes[0].playlist_title,
      user_username: playlistRes[0].user_username,
      songs: playlistRes.map(row => ({
        title: row.song_title,
        artist: row.song_artist
      }))
    };
  
    return playlist;
  }

  static async update(title, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: 'title',
      user_id: 'user_id'
    });
    const titleVarIdx = '$' + (values.length + 1);
  
    const querySql = `UPDATE playlists 
                      SET ${setCols} 
                      WHERE title = ${titleVarIdx} 
                      RETURNING title, user_id`;
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

  static async addSong(playlistTitle, songId) {
    const playlistRes = await db.query(
      `SELECT playlist_id FROM playlists WHERE title=$1`,
      [playlistTitle]
    );
    console.log('line 102', playlistRes);
    // console.log('line 103', playlistRes.rows[0].playlist_id);
    const playlistType = playlistRes[0].playlist_id;  // Accessing the playlist_id correctly
    console.log('Line 104 corrected', playlistType);
    console.log(songId);
    console.log(`Query: INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2), Values: `, [playlistType, songId]);


    await db.query(
      `INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2)`,
      [playlistType, songId]
    );
  }

  static async removeSong(playlistTitle, songId) {
    const playlistRes = await db.query(
      `SELECT playlist_id FROM playlists WHERE title=$1`,
      [playlistTitle]
    );
    const playlistId = playlistRes.rows[0].playlist_id;

    await db.query(
      `DELETE FROM playlist_songs WHERE playlist_id=$1 AND song_id=$2`,
      [playlistId, songId]
    );
  }
}

module.exports = Playlist;