const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError,  UnauthorizedError, ForbiddenError  } = require('../expressError');
const User = require('../models/User');

const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');
const { createToken } = require('../helpers/token');

const router = new express.Router();

/** POST / { user } =>  { user }
 *
 * user should have { username, password, firstName, lastName, email }

 */
router.post('/', async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, email, is_admin } = req.body;
    
    // Check if firstName is provided
    if (!first_name) {
      throw new BadRequestError('First name is required.');
    }

    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.create({ username, password, first_name, last_name, email, is_admin });
    console.log(user);
    // const token = createToken(user);
    // const token = createToken(user.id, username, is_admin);
    console.log('Response sent:', { user});
    return res.status(201).json({ user});
    // return res.status(201).json({ user, token});
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { users: [ { username, firstName, lastName, email }, ...] }
 *
 * Authorization required: none
 */
router.get('/', async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /:username  =>  { user }
 *
 * Returns { username, firstName, lastName, email }
 * Throws NotFoundError if the user is not found.
 *
 * Authorization required: none
 */


router.get('/:username', async function (req, res, next) {
  try {
  
    const user = await User.getByUsername(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /:username { fld1, fld2, ... } => { user }
 *
 * Patches user data.
 *
 * fields can be: { firstName, lastName, email }
 *
 * Returns { username, firstName, lastName, email }
 * Throws NotFoundError if the user is not found.
 *
 * Authorization required: login
 */
router.patch('/:username', async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});
// // {
// // 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1NHNlcjEwMDAwMCIsImlhdCI6MTY5NjAxNjkwMX0.-_PPhElkIwoNUjWZVdmb60Apk9yulQFNP4W5td_lF_w"
// // }
// {
//   "username": "testu4ser100000",
//   "password": "pas4sword123"

// }

// router.post('/auth/login', async function(req, res, next) {
//   try {
//       const { username, password } = req.body;
//       const user = await User.authenticate(username, password);
      
//       const token = createToken(user);
//       return res.json({ token });
//   } catch (err) {
//       return next(err);
//   }
// });
router.post('/auth/login', async function(req, res, next) {
  try {
      const { username, password } = req.body;

      // Ensure username and password are provided
      if (!username || !password) {
        throw new BadRequestError('Username and password are required');
      }

      const user = await User.authenticate(username, password);
      
      // Ensure user object is returned by User.authenticate method
      if (!user) {
        throw new UnauthorizedError('Invalid username/password');
      }

      const token = createToken(user);

      // Ensure to only return necessary user data, avoid sending sensitive data
      const userData = {
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
        // add other user fields as needed, but NOT the password
      };

      // Log for debugging, ensure to remove or comment out in production
      console.log('Sending response:', { token, user: userData });

      return res.json({ token, user: userData });
  } catch (err) {
      // Log error for debugging, ensure to remove or comment out in production
      console.error('Error in /auth/login:', err);

      return next(err);
  }
});
router.delete('/:username', async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;