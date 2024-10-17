const express = require("express")
const orderStoreItem = express.Router({mergeParams:true})

const {getAllOrderStoreItems, getOneOrderStoreItem, createOrderStoreItem, updateOrderStoreItem, deleteOrderStoreItem} = require('../queries/orderstoreitems.js')
// validations

// MAKE SURE TO CREATE A TRADITIONAL GET ALL INSIDE OF A HOST/ ROUTE

// GET ALL STORE ITEMS THAT RELATES TO PARENT DISPENSARY
orderStoreItem.get("/", async (req, res) => {
    const { client_order_id } = req.params
    console.log(req.params,'< params')
    const allOrderStoreItems = await getAllOrderStoreItems(client_order_id)

    if(allOrderStoreItems.length){
        res.status(200).json(allOrderStoreItems)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
orderStoreItem.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneOrderStoreItem = await getOneOrderStoreItem(id)

    if(!oneOrderStoreItem.message){
        res.status(200).json(oneOrderStoreItem)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
orderStoreItem.post("/", async (req, res) => {
    const newOrderStoreItem = await createOrderStoreItem(req.body)

    if(!newOrderStoreItem.message){
        res.status(200).json(newOrderStoreItem)
    }
    else {
        res.status(500).json({error: newOrderStoreItem.message})
    }
})

// UPDATE
orderStoreItem.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedOrderStoreItem = await updateOrderStoreItem(req.body, id)

    if(!updatedOrderStoreItem.message){
        res.status(200).json(updatedOrderStoreItem)
    }
    else {
        res.status(500).json({error: updatedOrderStoreItem.message})
    }
})

// DELETE 
orderStoreItem.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedOrderStoreItem = await deleteOrderStoreItem(id)

    if(!deleteOrderStoreItem.message){
        res.status(200).json(deletedBasketItem)
    }
    else{
        res.status(500).json({error: deletedBasketItem.message})
    }
})

module.exports = orderStoreItem