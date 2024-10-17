const express = require("express")
const order = express.Router({mergeParams: true})
const orderStoreItemController = require ('./orderStoreItemController')
order.use('/:client_order_id/storeitems', orderStoreItemController)

const {getAllOrders, getOneOrder, createOrder, updateOrder, deleteOrder} = require('../queries/orders.js')
// validations

// MAKE SURE TO CREATE A TRADITIONAL GET ALL INSIDE OF A HOST/ ROUTE

// GET ALL STORE ITEMS THAT RELATES TO PARENT DISPENSARY
order.get("/", async (req, res) => {
    const { client_user_id } = req.params
    const allOrders = await getAllOrders(client_user_id)

    if(allOrders.length){
        res.status(200).json(allOrders)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
order.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneOrder = await getOneOrder(id)

    if(!oneOrder.message){
        res.status(200).json(oneOrder)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
order.post("/", async (req, res) => {
    const newOrder = await createOrder(req.body)

    if(!newOrder.message){
        res.status(200).json(newOrder)
    }
    else {
        res.status(500).json({error: newOrder.message})
    }
})

// UPDATE
order.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedOrder = await updateOrder(req.body, id)

    if(!updatedOrder.message){
        res.status(200).json(updatedOrder)
    }
    else {
        res.status(500).json({error: updatedOrder.message})
    }
})

// DELETE 
order.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedOrder = await deleteOrder(id)

    if(!deletedOrder.message){
        res.status(200).json(deletedOrder)
    }
    else{
        res.status(500).json({error: deletedOrder.message})
    }
})

module.exports = order