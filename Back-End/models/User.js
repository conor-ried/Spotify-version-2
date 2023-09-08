const db = require('../database');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class User {
  /** Create a new user, update the database, and return the new user data.
   *
   * data should be { username, password, firstName, lastName, email }
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws BadRequestError if the username is already in the database.
   */
  static async create({ username, password, first_name, last_name, email }) {
    // const duplicateCheck = await db.query(
    //   `SELECT username
    //    FROM users
    //    WHERE username = $1`,
    //   [username]
    // );

    // if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate username: ${username}`);
   
    const result = await db.query(
      `INSERT INTO users
         (username, password, first_name, last_name, email)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING username, first_name , last_name , email`,
      [username, password, first_name, last_name, email]
    );
    console.log('Result:', result);

// Access the user data
    const user = result[0]; // Since result is an array

    console.log('User:', user);

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, firstName, lastName, email }, ...]
   */

  static async findAll() {
    console.log('Executing SQL query:', `SELECT username, first_name AS "firstName", last_name AS "lastName", email FROM users`);
    const users = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
       FROM users`
    );
    console.log('Query result:', users);
    return users;
  }
  // static async findAll() {
  //   const usersRes = await db.query(
  //     `SELECT username,
  //             first_name AS "firstName",
  //             last_name AS "lastName",
  //             email
  //      FROM users`
  //   );

  //   return usersRes.rows;
  // }

  /** Get user by username.
   *
   * Returns { username, firstName, lastName, email }
   * Throws NotFoundError if the user is not found.
   */
  static async getByUsername(username) {
    console.log('Fetching user with username:', username);
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
       FROM users
       WHERE username = $1`,
      [username]
    );
    console.log('Query result:', userRes.rows);
    // console.log(userRes, "test with just userRes returns object");
    // console.log(userRes[0], "test without rows returns object");
    // console.log(userRes.rows[0]);
  

  
    const user = userRes[0];
    console.log('Query result:', user); // Log the user data
  
    return user;
  }
  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { firstName, lastName, email }
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws NotFoundError if the user is not found.
   */
  static async update(username, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: 'first_name',
      lastName: 'last_name',
    });
    const usernameVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username, 
                                first_name AS "firstName", 
                                last_name AS "lastName", 
                                email`;
    const result = await db.query(querySql, [...values, username]);
    console.log(result);
    const user = result[0];

    if (!user) throw new NotFoundError(`No user found with username: ${username}`);

    return user;
  }

  /** Delete user by username; returns undefined.
   *
   * Throws NotFoundError if the user is not found.
   */
  static async remove(username) {
    const result = await db.query(
      `DELETE
       FROM users
       WHERE username = $1
       RETURNING username`,
      [username]
    );
    const user = result[0];

    if (!user) throw new NotFoundError(`No user found with username: ${username}`);
  }
}

module.exports = User;