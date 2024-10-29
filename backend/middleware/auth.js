const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getLoginByEmail } = require("../queries/clientusers.js");

dotenv.config();

const generateWebToken = (email) => {
    return JWT.sign({ email: email }, process.env.SECRET_TOKEN, {
      expiresIn: '720h',
    });
  };
  
const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const credentials = await getLoginByEmail(email);
    console.log(credentials)
    if (!credentials.message) {
      const isPassValid = await bcrypt.compare(password, credentials.password);
      if (isPassValid) {
        const token = generateWebToken(email);
        req.body.token = token;
        req.body["user_id"] = credentials["id"]
        req.body.name = credentials["name"]
        console.log(req.body)
        next();
      } else {
        res.status(400).json({ error: "Invalid password" });
      }
    } else {
      res.status(401).json({ error: `No account linked to ${email}` });
    }
  };

const doesAccountExist = async (req, res, next) => {
  const { email } = req.body;
  const credentials = await getLoginByEmail(email)
  // if there is no error message = there is an account
  if(credentials.email) {
    res.status(200).json({ message: `An account is already linked to ${email}` })
  } else {
    console.log('account does not exist')
    next();
  }
}

const hashPass = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(500).json({ error: "Error processing password" });
    }
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      req.decoded = JWT.verify(token, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

  

module.exports = {
    verifyToken,
    doesAccountExist,
    hashPass,
    userLogin
  };
