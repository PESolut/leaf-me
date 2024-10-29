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
        console.log('Starting hashPass...');
        
        if (!req.body) {
            console.error('No request body found');
            return res.status(400).json({ error: "No request body" });
        }

        console.log('Password from request:', typeof req.body.password, req.body.password ? 'exists' : 'undefined');
        
        if (!req.body.password) {
            console.error('No password in request body');
            return res.status(400).json({ error: "Password is required" });
        }

        try {
            console.log('Generating salt...');
            const salt = await bcrypt.genSalt(10);
            console.log('Salt generated successfully');
            
            console.log('Hashing password...');
            const hash = await bcrypt.hash(req.body.password, salt);
            console.log('Password hashed successfully');
            
            req.body.password = hash;
            next();
        } catch (innerError) {
            console.error('Bcrypt operation failed:', innerError);
            return res.status(500).json({ 
                error: "Error processing password",
                details: innerError.message 
            });
        }
    } catch (error) {
        console.error('Outer error in hashPass:', error);
        return res.status(500).json({ 
            error: "Error processing password",
            details: error.message 
        });
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
