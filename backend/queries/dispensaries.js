const db = require("../db/dbConfig.js");

const getAllDispensaries = async (search) => {
  try {
    if (!search){
      const allDispensaries = await db.any("SELECT * FROM dispensary");
      return allDispensaries;
    } else {
      const filteredDispensaries = await db.any("SELECT * FROM dispensary WHERE LOWER(name) LIKE $1 OR LOWER(address) LIKE $1",[`%${search.toLowerCase()}%`])
      return filteredDispensaries
    }
  } catch (error) {
    return error;
  }
  
};

const getOneDispensary = async (idVal) => {
  try {
    const oneDispensary = await db.one("SELECT * FROM dispensary WHERE id=$1", idVal);
    return oneDispensary;
  } catch (error) {
    return error;
  }
};

const createDispensary = async (dispensary) => {
  try {
    const newDispensary = await db.one(
      "INSERT INTO dispensary (Name, Image, deliveryFee, minDeliveryTime, maxDeliveryTime, Rating, Address, Lat, Long) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        dispensary.Name,
        dispensary.Image,
        dispensary.deliveryFee,
        dispensary.minDeliveryTime,
        dispensary.maxDeliveryTime,
        dispensary.Rating,
        dispensary.Lat,
        dispensary.Long
      ]
    );
    return newDispensary;
  } catch (error) {
    return error;
  }
};

const updateDispensary = async (dispensary, idVal) => {
  try {
    const updatedDispensary = await db.one(
      "UPDATE dispensary SET Name=$1, Image=$2, deliveryFee=$3, minDeliveryTime=$4, maxDeliveryTime=$5, Rating=$6, Address=$7, Lat=$8, Lat=$9 WHERE id=$10 RETURNING *",
      [
        dispensary.Name,
        dispensary.Image,
        dispensary.deliveryFee,
        dispensary.minDeliveryTime,
        dispensary.maxDeliveryTime,
        dispensary.Rating,
        dispensary.Lat,
        dispensary.Long,
        idVal
      ]
    );
    return updatedDispensary;
  } catch (error) {
    return error;
  }
};

const deleteDispensary = async (idVal) => {
  try {
    const deletedDispensary = await db.one(
      "DELETE FROM dispensary WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedDispensary;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllDispensaries,
  getOneDispensary,
  createDispensary,
  updateDispensary,
  deleteDispensary,
};
