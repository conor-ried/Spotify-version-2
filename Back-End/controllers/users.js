const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError,  UnauthorizedError, ForbiddenError  } = require('../expressError');
const User = require('../models/User');

const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');

const { createToken } = require('../helpers/token');
const {authenticateUser, authorizeAdmin} = require('../middleware/auth');
const router = new express.Router();

/** POST / { user } =>  { user }
 *
 * user should be { username, password, firstName, lastName, email }
 *
 * Returns { username, firstName, lastName, email }
 *
 * Authorization required: login
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
    const token = createToken(user);
    // const token = createToken(user.id, username, is_admin);
    console.log('Response sent:', { user, token});
    return res.status(201).json({ user, token});
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

/** DELETE /:username  =>  { deleted: username }
 *
 * Authorization: login
 */
// router.delete('/:username', async function (req, res, next) {
//   try {
//     await User.remove(req.params.username);
//     return res.json({ deleted: req.params.username });
//   } catch (err) {
//     return next(err);
//   }
// });
router.delete('/:username', authenticateUser, authorizeAdmin, async (req, res, next) => {
  try {
    // Extract the username from the request parameters
    const username = req.params.username;

    // Fetch the user making the request (requesting user)
    const requestingUser = req.user;

    // Fetch the user to be deleted
    const userToDelete = await User.getByUsername(username);

    // Check if the requesting user is an admin
    if (!requestingUser.is_admin) {
      // If not an admin, return a 403 Forbidden error
      return res.status(403).json({ error: 'Unauthorized: Only admin users can delete users.' });
    }

    // Perform the user deletion by calling the remove method on the User model
    await User.remove(username);

    // Respond with a success message
    return res.json({ deleted: username });
  } catch (err) {
    // Handle any errors that may occur during the process
    return next(err);
  }
});


module.exports = router;