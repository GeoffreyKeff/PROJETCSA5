import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/User';

const prisma = new PrismaClient();


/**
 * Create a user
 * @param {User} user the user to be created
 */
async function CreateUser(user: User) {

  return prisma.users.create({
    data: {
      Username: user.username,
      Password: user.password,
    },
  });
}


/**
 * Get a user
 * @param {string} username the user username to get
 */
async function GetUser(username: string) {
  return prisma.users.findUnique({
    where: {
      Username: username,
    },
    select: {
      UserId: true,
      Username: true,
      RegistrationDate: true,
      UpdatedAt: true,
    },
  });
}

/**
 * Get all users
 */
async function GetUsers() {
  return prisma.users.findMany({
    select: {
      UserId: true,
      Username: true,
      RegistrationDate: true,
      UpdatedAt: true,
    },
  });
}

/**
 * Delete a user
 * @param {string} username the user username to be deleted
 */
async function DeleteUser(username: string) {
  await prisma.users.delete({
    where: {
      Username: username,
    },
  });
}

/**
 * Update a user
 * @param {string} username the user username to be updated
 * @param {User} updatedUser the updated user data
 */
async function UpdateUser(username: string, updatedUser: User) {
  return prisma.users.update({
    where: {
      Username: username,
    },
    data: {
      Username: updatedUser.username,
    },
  });
}

/**
 * Update a user password
 */
async function UpdateUserPassword(username: string, password: string) {
  return prisma.users.update({
    where: {
      Username: username,
    },
    data: {
      Password: password,
    },
  });
}

/**
 * Get a user hashed password
 * @param {string} username the user username to get
 */
async function GetUserPassword(username: string) {
  return prisma.users.findUnique({
    where: {
      Username: username,
    },
    select: {
      UserId: true,
      Username: true,
      Password: true,
    },
  });
}


/**
 * add token to user
 * @param {string} username the user username to be updated
 * @param {string} token the token to be added
 */
async function AddTokenToUser(username: string, token: string) {
  return prisma.users.update({
    where: {
      Username: username,
    },
    data: {
      Token: token,
    },
  });
}

export { CreateUser, GetUser, GetUsers, DeleteUser, UpdateUser, UpdateUserPassword, GetUserPassword, AddTokenToUser };