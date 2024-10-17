const db = require("../db/dbConfig.js");

const getAllClientUsers = async () => {
  try {
    const allClientUsers = await db.any("SELECT * FROM client_user");
    return allClientUsers;
  } catch (error) {
    return error;
  }
};

const getOneClientUser = async (idVal) => {
  try {
    const oneClientUser = await db.one("SELECT * FROM client_user WHERE id=$1", idVal);
    return oneClientUser;
  } catch (error) {
    return error;
  }
};

const createClientUser = async (clientUser) => {
  try {

    // make this into a validation
    // const existingUser = await db.one("SELECT * FROM client_user WHERE email=$1", clientUser.email);
    // console.log(existingUser)
    // if (existingUser) {
    //   return 'Email already exists'
    // } else {
      
    // }

    


    const newClientUser = await db.one(
      "INSERT INTO client_user (Name, Address, Latitude, Longitude, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        clientUser.name,
        clientUser.address,
        clientUser.latitude,
        clientUser.longitude,
        clientUser.email,
        clientUser.password
      ]
    );
    return newClientUser;
  } catch (error) {
    return error;
  }
};

const updateClientUser = async (clientUser, idVal) => {
  try {
    const updatedClientUser = await db.one(
      "UPDATE client_user SET Name=$1, Address=$2, latitude=$3, longitude=$4 WHERE id=$7 RETURNING *",
      [
        clientUser.Name,
        clientUser.Address,
        clientUser.Latitude,
        clientUser.Longitude,
        clientUser.email,
        clientUser.password,
        idVal
      ]
    );
    return updatedClientUser;
  } catch (error) {
    return error;
  }
};

const deleteClientUser = async (idVal) => {
  try {
    const deletedClientUser = await db.one(
      "DELETE FROM client_user WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedClientUser;
  } catch (error) {
    return error;
  }
};

const getLoginByEmail = async (email) => {
  try {
    const loginCredentials = await db.one("SELECT * FROM client_user WHERE email=$1", email);
    return loginCredentials;
  } catch (error) {
    return error;
  }
}


module.exports = {
  getLoginByEmail,
  getAllClientUsers,
  getOneClientUser,
  createClientUser,
  updateClientUser,
  deleteClientUser
};
