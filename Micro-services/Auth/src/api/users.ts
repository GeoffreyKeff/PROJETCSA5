import express from 'express';
import {
  AddTokenToUser,
  CreateUser,
  DeleteUser,
  GetUser,
  GetUserPassword,
  GetUsers,
  UpdateUser,
  UpdateUserPassword,
} from '../modules/users';
import { User } from '../interfaces/User';
import { comparePassword, hashPassword } from '../modules/hashPassword';

const router = express.Router();

/**
 * ping user route
 */
router.get('/', function (req, res, next) {
  res.status(200).json({ message: 'Users routes' });
});

/**
 * create a user
 */
router.post('/create', async function (req, res, next) {
  const { username, firstName, lastName, password } = req.query;

  const hashPwd = await hashPassword(password as string);
  console.log(hashPwd);
  console.log(password);
  if (!hashPwd) {
    res.status(500).json({ error: 'Error while hashing password' });
  }
  const user = {
    username: username,
    password: hashPwd,
  } as User;
  try {
    const newUser = await CreateUser(user);
    res.status(200).json({ response: newUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


/**
 * get a user by username
 */
router.get('/getUser', async function (req, res, next) {
  const { username } = req.query;
  try {
    const users = await GetUser(username as string);
    res.status(200).json({ response: users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


/**
 * get all users
 */
router.get('/getUsers', async function (req, res, next) {
  try {
    const users = await GetUsers();
    res.status(200).json({ response: users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * delete a user
 */
router.delete('/deleteUser', async function (req, res, next) {
  const { username } = req.query;
  try {
    await DeleteUser(username as string);
    res.status(200).json({ response: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * update a user
 */
router.patch('/updateUser', async function (req, res, next) {
  const { username, firstName, lastName, roles, userEmail } = req.query;

  const user = {
    username: username,
  } as User;
  try {
    await UpdateUser(userEmail as string, user);
    const updatedUser = await GetUser(username as string);
    res.status(200).json({ response: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * update a user password
 */
router.patch('/updateUserPassword', async function (req, res, next) {
  const { username, newPassword, oldPassword } = req.query;

  const oldHashPwd = await GetUserPassword(username as string);

  const comparePwd = await comparePassword(oldPassword as string, oldHashPwd?.Password as string);
  if (!comparePwd) {
    res.status(401).json({ error: 'Old password is not correct' });
  }
  const hashPwd = await hashPassword(newPassword as string);
  if (!hashPwd) {
    res.status(500).json({ error: 'Error while hashing password' });
  }

  try {
    await UpdateUserPassword(username as string, hashPwd as string);
    res.status(200).json({ response: 'Password updated' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Check user password
 */
router.post('/checkUserPassword', async function (req, res, next) {
  const { username, password } = req.query;
  try {
    const hashPwd = await GetUserPassword(username as string);
    const comparePwd = await comparePassword(password as string, hashPwd?.Password as string);
    if (!comparePwd) {
      res.status(401).json({ error: 'Password is not correct' });
    } else {
      res.status(200).json({ response: 'Password is correct' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/addTokenToUser', async function (req, res, next) {
  const { username, token } = req.query;
  try {
    await AddTokenToUser(username as string, token as string);
    res.status(200).json({ response: 'Token added' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;