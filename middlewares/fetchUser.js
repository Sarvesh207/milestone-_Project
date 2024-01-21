//  will take req, res => if logged in than proceed ahead else give error to login user
const secreateKey = "MileStoneProject";

const jwt = require('jsonwebtoken');

module.exports.fetchUser = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized access", status:"error"})
    }

    jwt.verify(token, secreateKey, (err, decoded) => {
        if(err){
          return res.status(401).json({message:"Unauthorized access", status:"error"})

        }
        req.user = decoded.user;

        next();
    })
}