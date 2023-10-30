const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class NewMusicFeed {


  static async findAll() {
    const songs = await db.query(
      `SELECT *
       FROM new_music_feed 
       ORDER BY release_year DESC`
    );
    return songs;
  }
  static async getByGenre(genre) {
    const songRes = await db.query(
      `SELECT *
       FROM new_music_feed
       WHERE genre = $1`,
      [genre]
    );
  
    console.log(songRes);
    
    const songArray = songRes.map(val => val);
    return songArray;
  }


}

module.exports = NewMusicFeed;