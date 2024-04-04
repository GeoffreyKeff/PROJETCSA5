import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import { checkJWT, createJWT } from '../modules/jwt';
import { User } from '../interfaces/User';

const router = express.Router();

/**
 * ping authentication route
 */
router.get<{}, MessageResponse>('/', (req, res) => {
  res.status(200).json({ message: 'Authentication routes' });
});


/**
 * create JWT token
 */
router.post('/create', function (req, res, next) {

  const { userId, username} = req.query;
  if (!userId || !username) {
    res.status(500).json({ error: 'Missing parameters' });
  } else {
    const user = {
      userId: +userId,
      username: username,
    } as User;

    let token = createJWT(user);

    //createRefreshToken()
    res.json({ token: token });
  }
});

/**
 * check JWT token
 */
router.post('/verify', function (req, res, next) {
  if (!req.query.token) {
    res.status(500).json({ error: 'Missing parameters' });
  } else {
    let check = checkJWT(req.query.token as string);
    res.json({ check: check });
  }
});


export default router;