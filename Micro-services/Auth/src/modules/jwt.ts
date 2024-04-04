import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../interfaces/User';

/**
 * create JWT token
 * @param {User} user the user to create the token for
 */
const createJWT = (user: User) => {
    return jwt.sign({
        user: user,
    }, process.env.JWT_SECRET as unknown as string, { expiresIn: '1h' });
};


/**
 * check JWT token
 * @param {string} token the token to check
 */
const checkJWT = (token: string) => {

    let check: boolean | string | JwtPayload = false;

    try {
        check = jwt.verify(token, process.env.JWT_SECRET as unknown as string);
    } catch (err) {
        check = false;
        console.log(err);
    }
    return check;
};

export { createJWT, checkJWT };
