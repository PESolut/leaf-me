const express = require("express")
const clientUser = express.Router()
const { hashPass, verifyToken , userLogin, doesAccountExist} = require("../middleware/auth.js");
const basketController = require("./basketController.js")
clientUser.use('/:client_user_id/basket', basketController)
const orderController = require("./orderController.js")
clientUser.use('/:client_user_id/order', orderController)


const {getAllClientUsers,  getOneClientUser, createClientUser, updateClientUser, deleteClientUser} = require('../queries/clientusers.js');


// validations

// GET ALL
clientUser.get("/", async (req, res) => {
    const allClientUsers = await getAllClientUsers()

    if(allClientUsers.length){
        res.status(200).json(allClientUsers)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
clientUser.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneClientUser = await getOneClientUser(id)

    if(!oneClientUser.message){
        res.status(200).json(oneClientUser)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE / REGISTER
clientUser.post("/", doesAccountExist, hashPass, async (req, res) => {
    try {
        console.log("Creating user with data:", {
            ...req.body,
            password: '[REDACTED]'
        });
        
        const newUser = await createClientUser(req.body);
        console.log("Database response:", newUser);
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
});

// LOGIN
clientUser.post("/login", userLogin, async (req, res) => {
    req.body.token;
    res
      .status(200)
      .json({
        message: "You are signed in!",
        token: req.body.token,
        user_id: req.body["user_id"],
        name: req.body.name
      });
})

// UPDATE
clientUser.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedClientUser = await updateClientUser(req.body, id)

    if(!updatedClientUser.message){
        res.status(200).json(updatedClientUser)
    }
    else {
        res.status(500).json({error: updatedClientUser.message})
    }
})

// DELETE 
clientUser.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedClientUser = await deleteClientUser(id)

    if(!deletedClientUser.message){
        res.status(200).json(deletedClientUser)
    }
    else{
        res.status(500).json({error: deletedClientUser.message})
    }
})

// CHECK IF USER EXISTS
clientUser.post("/check-email", async (req, res, next) => {
    try {
        await doesAccountExist(req, res, () => {
            // If middleware passes (account doesn't exist)
            res.status(200).json({ message: "Email is available" });
        });
    } catch (error) {
        // If middleware fails (account exists)
        res.status(200).json({ message: "Email does not exist" });
    }
});

module.exports = clientUser
