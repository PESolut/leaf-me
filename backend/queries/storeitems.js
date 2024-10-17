const db = require("../db/dbConfig.js");

const getTrueAllStoreItems = async () => {
  try {
    const allStoreItems = await db.any("SELECT * from store_item");
    return allStoreItems
  } catch (error) {
    return error
  }
}

const getAllStoreItems = async (dispensary_ID) => {
  try {
    console.log(dispensary_ID)
    const allStoreItems = await db.any("SELECT * FROM store_item WHERE dispensary_id=$1", dispensary_ID);
    return allStoreItems;
  } catch (error) {
    return error;
  }
};

const getOneStoreItem = async (idVal) => {
  try {
    const oneStoreItem = await db.one("SELECT * FROM store_item WHERE id=$1", idVal);
    return oneStoreItem;
  } catch (error) {
    return error;
  }
};

const createStoreItem = async (storeItem) => {
  try {
    const newStoreItem = await db.one(
      "INSERT INTO store_item (Name, Image, Description, Price, dispensary_ID) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        storeItem.Name,
        storeItem.Image,
        storeItem.Description,
        storeItem.Price,
        storeItem.dispensary_ID,
      ]
    );
    return newStoreItem;
  } catch (error) {
    return error;
  }
};

const updateStoreItem = async (storeItem, idVal) => {
  try {
    const updatedStoreItem = await db.one(
      "UPDATE store_item SET Name=$1, Image=$2, Description=$3, Price=$4, dispensary_ID=$5 WHERE id=$6 RETURNING *",
      [
        storeItem.Name,
        storeItem.Image,
        storeItem.Description,
        storeItem.Price,
        storeItem.dispensary_ID,
        idVal
      ]
    );
    return updatedStoreItem;
  } catch (error) {
    return error;
  }
};

const deleteStoreItem = async (idVal) => {
  try {
    const deletedStoreItem = await db.one(
      "DELETE FROM store_item WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedStoreItem;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getTrueAllStoreItems,
  getAllStoreItems,
  getOneStoreItem,
  createStoreItem,
  updateStoreItem,
  deleteStoreItem
};
