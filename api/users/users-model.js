const db = require("../data/dbConfig");

function getAllUsers() {
  return db("Users");
}

function getUserByUserId(UserId) {
  return db("Users").where("UserId", UserId);
}

function getBy(filter) {
  return db("Users as U").select("U.UserId", "U.User_name").where(filter);
}

async function createUser(userToAdd) {
  return await db("Users").insert(userToAdd, ["UserId", "User_name", "phoneNumber"]);
}

async function updateUserByUserId(UpdatedUser) {
  await db("Users").where("UserId", UpdatedUser.UserId).update(UpdatedUser);
  return getUserByUserId(UpdatedUser.UserId);
}

async function deleteUserByUserId(UserIdToRemove) {
  await db("Users").where("UserId", UserIdToRemove).del();
  return getAllUsers();
}

module.exports = {
  getAllUsers,
  getUserByUserId,
  getBy,
  createUser,
  updateUserByUserId,
  deleteUserByUserId,
};
