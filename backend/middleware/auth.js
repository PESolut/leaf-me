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
  console.log('req.body.password:',req.body.password)
    try {
        if (!req.body.password) {
            return res.status(400).json({ error: "Password is required" });
        }

        let salt;
        try {
            salt = await bcrypt.genSalt(10);
        } catch (saltError) {
            console.error("Salt generation error:", saltError);
            return res.status(500).json({ error: "Failed to generate salt" });
        }

        let hash;
        try {
            hash = await bcrypt.hash(req.body.password, salt);
        } catch (hashError) {
            console.error("Hash generation error:", hashError);
            return res.status(500).json({ error: "Failed to hash password" });
        }

        req.body.password = hash;
        next();
    } catch (error) {
        console.error("General error in hashPass:", error);
        return res.status(500).json({ error: "Error processing password" });
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
