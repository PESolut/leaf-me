const express = require("express")
const basket = express.Router({mergeParams:true})
const basketItemController = require('./basketItemController')
basket.use('/:basket_id/storeitems', basketItemController)

const {getAllBaskets, getOneBasket, createBasket, updateBasket, deleteBasket} = require('../queries/baskets.js')
// validations

// MAKE SURE TO CREATE A TRADITIONAL GET ALL INSIDE OF A HOST/ ROUTE

// GET ALL STORE ITEMS THAT RELATES TO PARENT DISPENSARY
basket.get("/", async (req, res) => {
    const { client_user_id } = req.params
    const allBaskets = await getAllBaskets(client_user_id)

    if(allBaskets.length){
        res.status(200).json(allBaskets)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
basket.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneBasket = await getOneBasket(id)

    if(!oneBasket.message){
        res.status(200).json(oneBasket)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
basket.post("/", async (req, res) => {
    const newBasket = await createBasket(req.body)

    if(!newBasket.message){
        res.status(200).json(newBasket)
    }
    else {
        res.status(500).json({error: newBasket.message})
    }
})

// UPDATE
basket.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedBasket = await updateBasket(req.body, id)

    if(!updatedBasket.message){
        res.status(200).json(updatedBasket)
    }
    else {
        res.status(500).json({error: updateBasket.message})
    }
})

// DELETE 
basket.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedBasket = await deleteBasket(id)

    if(!deletedBasket.message){
        res.status(200).json(deletedBasket)
    }
    else{
        res.status(500).json({error: deletedBasket.message})
    }
})

module.exports = basket