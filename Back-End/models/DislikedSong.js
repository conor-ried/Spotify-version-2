const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class DislikedSong {
  static async create({ userId, songId }) {
    const result = await db.query(
      `INSERT INTO disliked_songs
         (user_id, song_id)
         VALUES ($1, $2)
         RETURNING user_id, song_id`,
      [userId, songId]
    );
    console.log(result);
    const song = result;
    return song;
  }

  static async findAll() {
    const result = await db.query(
      `SELECT u.username, s.title, s.artist
       FROM disliked_songs ds
       JOIN users u ON ds.user_id = u.user_id
       JOIN songs s ON ds.song_id = s.song_id`
    );
    console.log(result);
    return result;
  }
  static async getByName(songName) {
    try {
      const songIdResult = await db.query(
        `SELECT song_id FROM songs WHERE title = $1`,
        [songName]
      );
  
      console.log('songIdResult:', songIdResult);
      console.log('songIdResult with 0:', songIdResult[0]);
  
     
  
      const songId = songIdResult[0].song_id;
      console.log('rows are the WOAT', songId);
  
      const dislikedSongsResult = await db.query(
        `SELECT * FROM disliked_songs WHERE song_id = $1`,
        [songId]
      );
  
      console.log('dislikedSongsResult:', dislikedSongsResult);
  
      if(!dislikedSongsResult) {
        throw new Error('Unexpected error: failed to fetch disliked songs');
      }
  
      return dislikedSongsResult;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // ... (no changes in update and remove for now)
}

module.exports = DislikedSong;