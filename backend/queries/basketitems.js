const db = require("../db/dbConfig.js");


const getAllBasketItems = async (basket_id) => {
  try {
    console.log(basket_id)
    const allBasketItems = await db.any("SELECT * FROM basket_store_item WHERE basket_id=$1",basket_id);
    return allBasketItems;
  } catch (error) {
    return error;
  }
};

const getOneBasketItem = async (idVal) => {
  try {
    const oneBasketItem = await db.one("SELECT * FROM basket_store_item WHERE id=$1", idVal);
    return oneBasketItem;
  } catch (error) {
    return error;
  }
};

const createBasketItem = async (basket_item) => {
  try {
    const newBasketItem = await db.one(
      "INSERT INTO basket_store_item (Quantity, basket_id, store_item_id) VALUES ($1, $2, $3) RETURNING *",
      [
        basket_item.quantity,
        basket_item.basket_id,
        basket_item.store_item_id
      ]
    );
    return newBasketItem;
  } catch (error) {
    return error;
  }
};

const updateBasketItem = async (basket_item, idVal) => {
  try {
    const updatedBasketItem = await db.one(
      "UPDATE basket_store_item SET Quantity=$1, basket_id=$2, store_item_id=$3 WHERE id=$4 RETURNING *",
      [
        basket_item.quantity,
        basket_item.basket_id,
        basket_item.store_item_id,
        idVal
      ]
    );
    return updatedBasketItem;
  } catch (error) {
    return error;
  }
};

const deleteBasketItem = async (idVal) => {
  try {
    const deletedBasketItem = await db.one(
      "DELETE FROM basket_store_item WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedBasketItem;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBasketItems,
  getOneBasketItem,
  createBasketItem,
  updateBasketItem,
  deleteBasketItem
};
