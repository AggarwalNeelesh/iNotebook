// jin jin routes me hume login required hoga, we will pass this middleware to them
// This function will fech the user
const JWT_SECRET = "BlueMoonDevil";
const jwt = require('jsonwebtoken');
const fetchuser = (req, res, next)=>{
    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next(); // next is a fuction which will run after we fetch the user
        // next function is a function in calling program
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a valid token"});
    }
}
module.exports = fetchuser;