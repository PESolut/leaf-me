const db = require("../db/dbConfig.js");


const getAllOrders = async (client_user_id) => {
  try {
    console.log(client_user_id)
    const allOrders = await db.any("SELECT * FROM client_order WHERE client_user_id=$1", client_user_id);
    return allOrders;
  } catch (error) {
    return error;
  }
};

const getOneOrder = async (idVal) => {
  try {
    const oneOrder = await db.one("SELECT * FROM client_order WHERE id=$1", idVal);
    return oneOrder;
  } catch (error) {
    return error;
  }
};

const createOrder = async (order) => {
  try {
    const newOrder = await db.one(
      "INSERT INTO client_order (total, status, client_user_id, dispensary_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        order.total,
        order.status,
        order.client_user_id,
        order.dispensary_id,
      ]
    );
    return newOrder;
  } catch (error) {
    return error;
  }
};

const updateOrder = async (order, idVal) => {
  try {
    const updatedStoreItem = await db.one(
      "UPDATE client_order SET total=$1, status=$2, client_user_id=$3, dispensary_id=$4 WHERE id=$5 RETURNING *",
      [
        order.total,
        order.status,
        order.client_user_id,
        order.dispensary_id,
        idVal
      ]
    );
    return updatedStoreItem;
  } catch (error) {
    return error;
  }
};

const deleteOrder = async (idVal) => {
  try {
    const deletedOrder = await db.one(
      "DELETE FROM client_order WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedOrder;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
