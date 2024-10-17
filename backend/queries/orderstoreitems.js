const db = require("../db/dbConfig.js");


const getAllOrderStoreItems = async (client_user_id) => {
  try {
    console.log(client_user_id)
    const allOrderStoreItems = await db.any("SELECT * FROM order_store_item WHERE client_order_id=$1", client_user_id);
    return allOrderStoreItems;
  } catch (error) {
    return error;
  }
};

const getOneOrderStoreItem = async (idVal) => {
  try {
    const oneOrderStoreItem = await db.one("SELECT * FROM order_store_item WHERE id=$1", idVal);
    return oneOrderStoreItem;
  } catch (error) {
    return error;
  }
};

const createOrderStoreItem = async (orderStoreItem) => {
  try {
    const newStoreItem = await db.one(
      "INSERT INTO order_store_item (quantity, client_order_id, store_item_id) VALUES ($1, $2, $3) RETURNING *",
      [
        orderStoreItem.quantity,
        orderStoreItem.client_order_id,
        orderStoreItem.store_item_id
      ]
    );
    return newStoreItem;
  } catch (error) {
    return error;
  }
};

const updateOrderStoreItem = async (orderStoreItem, idVal) => {
  try {
    const updatedOrderStoreItem = await db.one(
      "UPDATE order_store_item SET quantity=$1, client_order_id=$2, store_item_id=$3 WHERE id=$4 RETURNING *",
      [
        orderStoreItem.quantity,
        orderStoreItem.client_order_id,
        orderStoreItem.store_item_id,
        idVal
      ]
    );
    return updatedOrderStoreItem;
  } catch (error) {
    return error;
  }
};

const deleteOrderStoreItem = async (idVal) => {
  try {
    const deletedOrderStoreItem = await db.one(
      "DELETE FROM order_store_item WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedOrderStoreItem;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllOrderStoreItems,
  getOneOrderStoreItem,
  createOrderStoreItem,
  updateOrderStoreItem,
  deleteOrderStoreItem
};
