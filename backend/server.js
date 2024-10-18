const { getLocalIpAddress } = require("./localAddress.js")
const dotenv = require('dotenv');



// DEPENDENCIES
const app = require("./app.js")

// CONFIGURATION
require("dotenv").config()
const PORT = process.env.PORT || 3000
const localIP = getLocalIpAddress()

// LISTEN
app.listen(PORT, () => {console.log(`listening on port ${PORT}\nAPI address is: ${localIP}`)})