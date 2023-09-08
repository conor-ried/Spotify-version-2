const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class FavoritePodcast {
  static async create({ podcastName, creator, releaseDate }) {
    const result = await db.query(
      `INSERT INTO favoritepodcast
         (podcastName, creator, releaseDate)
         VALUES ($1, $2, $3)
         RETURNING podcastName, creator, releaseDate`,
      [podcastName, creator, releaseDate]
    );
    const podcast = result[0];
    return podcast;
  }

  static async findAll() {
    const podcasts = await db.query(
      `SELECT podcastName, creator, releaseDate
       FROM favoritepodcast`
    );
    return podcasts;
  }

  static async getByName(podcastName) {
    const podcastRes = await db.query(
      `SELECT podcastName, creator, releaseDate
       FROM favoritepodcast
       WHERE podcastName = $1`,
      [podcastName]
    );
    const podcast = podcastRes[0];
    return podcast;
  }

  static async update(podcastName, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      podcastName: 'podcastName',
      creator: 'creator',
      releaseDate: 'releaseDate'
    });
    const podcastNameVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE favoritepodcast 
                      SET ${setCols} 
                      WHERE podcastName = ${podcastNameVarIdx} 
                      RETURNING podcastName, creator, releaseDate`;
    const result = await db.query(querySql, [...values, podcastName]);
    const podcast = result[0];
    return podcast;
  }

  static async remove(podcastName) {
    const result = await db.query(
      `DELETE
       FROM favoritepodcast
       WHERE podcastName = $1
       RETURNING podcastName`,
      [podcastName]
    );
    const podcast = result[0];
    return podcast;
  }
}

module.exports = FavoritePodcast;