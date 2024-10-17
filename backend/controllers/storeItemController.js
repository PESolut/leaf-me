const express = require("express")
const storeItem = express.Router({mergeParams: true})

const {getAllStoreItems, getOneStoreItem, createStoreItem, updateStoreItem, deleteStoreItem} = require('../queries/storeitems.js')
// validations


// MAKE SURE TO CREATE A TRADITIONAL GET ALL INSIDE OF A HOST/STOREITEMS ROUTE

// GET ALL STORE ITEMS THAT RELATES TO PARENT DISPENSARY
storeItem.get("/", async (req, res) => {
    const { dispensary_id } = req.params
    console.log('controller',req.params)
    const allStoreItems = await getAllStoreItems(dispensary_id)

    if(allStoreItems.length){
        res.status(200).json(allStoreItems)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
storeItem.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneStoreItem = await getOneStoreItem(id)

    if(!oneStoreItem.message){
        res.status(200).json(oneStoreItem)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
storeItem.post("/", async (req, res) => {
    const newStoreItem = await createStoreItem(req.body)

    if(!newStoreItem.message){
        res.status(200).json(newStoreItem)
    }
    else {
        res.status(500).json({error: newStoreItem.message})
    }
})

// UPDATE
storeItem.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedStoreItem = await updateStoreItem(req.body, id)

    if(!updatedStoreItem.message){
        res.status(200).json(updatedStoreItem)
    }
    else {
        res.status(500).json({error: updatedStoreItem.message})
    }
})

// DELETE 
storeItem.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedStoreItem = await deleteStoreItem(id)

    if(!deletedStoreItem.message){
        res.status(200).json(deletedStoreItem)
    }
    else{
        res.status(500).json({error: deletedStoreItem.message})
    }
})

module.exports = storeItem