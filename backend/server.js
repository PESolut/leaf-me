const { getLocalIpAddress } = require("./localAddress.js")


// DEPENDENCIES
const app = require("./app.js")

// CONFIGURATION
require("dotenv").config()
const PORT = process.env.PORT
const localIP = getLocalIpAddress()

// LISTEN
app.listen(PORT, () => {console.log(`listening on port ${PORT}\nAPI address is: ${localIP}`)})