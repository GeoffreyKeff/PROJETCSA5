import jwt, { JwtPayload } from 'jsonwebtoken';


/**
 * check JWT token
 * @param {string} token the token to check
 */
const checkJWT = (token: string) => {

    let check: boolean | string | JwtPayload = false;

    try {
        check = jwt.verify(token, process.env.JWT_SECRET as unknown as string);
        console.log(token);
    } catch (err) {
        check = false;
        console.log(err);
    }
    return check;
};

export { checkJWT };