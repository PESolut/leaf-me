const express = require("express")
const basketItem = express.Router({mergeParams:true})

const {getAllBasketItems, getOneBasketItem, createBasketItem, updateBasketItem, deleteBasketItem} = require('../queries/basketitems.js')
// validations

// MAKE SURE TO CREATE A TRADITIONAL GET ALL INSIDE OF A HOST/ ROUTE

// GET ALL STORE ITEMS THAT RELATES TO PARENT DISPENSARY
basketItem.get("/", async (req, res) => {
    const { basket_id } = req.params
    console.log(req.params,'< params')
    const allBasketItems = await getAllBasketItems(basket_id)

    if(allBasketItems.length){
        res.status(200).json(allBasketItems)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
basketItem.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneBasketItem = await getOneBasketItem(id)

    if(!oneBasketItem.message){
        res.status(200).json(oneBasketItem)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
basketItem.post("/", async (req, res) => {
    const newBasketItem = await createBasketItem(req.body)

    if(!newBasketItem.message){
        res.status(200).json(newBasketItem)
    }
    else {
        res.status(500).json({error: newBasketItem.message})
    }
})

// UPDATE
basketItem.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedBasketItem = await updateBasketItem(req.body, id)

    if(!updatedBasketItem.message){
        res.status(200).json(updatedBasketItem)
    }
    else {
        res.status(500).json({error: updatedBasketItem.message})
    }
})

// DELETE 
basketItem.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedBasketItem = await deleteBasketItem(id)

    if(!deletedBasketItem.message){
        res.status(200).json(deletedBasketItem)
    }
    else{
        res.status(500).json({error: deletedBasketItem.message})
    }
})

module.exports = basketItem