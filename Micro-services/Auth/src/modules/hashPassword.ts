import bcrypt from 'bcrypt';

/**
 * Hash a password
 * @param {string} password
 */
export async function hashPassword(password: string) {
  const saltRound = process.env.SALT_ROUNDS as unknown as number;
  try {
    const salt = await bcrypt.genSalt(+saltRound);

    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Compare a plaintext password with a hash
 * @param {string} plaintextPassword
 * @param {string} hash
 */
export async function comparePassword(plaintextPassword: string, hash: string) {
  return bcrypt.compare(plaintextPassword, hash);
}