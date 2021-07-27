const db = require("../data/db-config");


function getAllUsers(){
    return db("Users");
}

function getUserByUserId(UserId){
    return db("Users")
        .where("UserId", UserId)
}

function getBy(filter) {
    return db("Users as U")
      .select("U.UserId", "U.User_Username")
      .where(filter);
}

async function createUser(userToAdd){
    const userToAddId = await db("Users")
            .insert(userToAdd)
    return getUserByUserId(userToAddId);
    // const [UserId] = await db("Users").insert(credentials)
    // return getUserByUserId(UserId) ;
}

async function updateUserByUserId(UpdatedUser){
    await db("Users")
        .where("UserId", UpdatedUser.UserId)
        .update(UpdatedUser)
    return getUserByUserId(UpdatedUser.UserId);
}

async function deleteUserByUserId(UserIdToRemove){
    await db("Users")
        .where("UserId", UserIdToRemove)
        .del()
    return getAllUsers();
}

function getUsersClasses(UserId){

    return db("UsersClasses As UC")
    .join("Users As U", "UC.UserId", "U.UserId")
    .join("Classes As C", "UC.ClassId", "C.ClassId")
    .select("U.UserId", "U.User_Username", "UC.ClassId", "C.Name")
    .where("U.UserId", UserId)
}

module.exports = {
  getAllUsers, getUserByUserId, getBy, createUser, updateUserByUserId, deleteUserByUserId, getUsersClasses
}