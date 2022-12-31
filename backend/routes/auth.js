const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const User = require('../models/User')
var jwt = require('jsonwebtoken');

const JWT_SECRET = "BlueMoonDevil";

// Create a User using : POST "/api/auth/createuser" . Dosen't require Auth
// No login required
router.post('/createuser', [  // Array
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 4 })
],async (req, res)=>{

    // If there are errors , return BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //Check whether theuser with this email exist already
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "User Already exist"});
      }

      const salt = await bcrypt.genSalt(10);
      securedPssword = await bcrypt.hash(req.body.password, salt);

      user =  await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPssword,
      })
      user.save();

      const data ={
        user:{
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);

    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
})

// Authentication a User using : POST "/api/auth/login" .No login required
router.post('/login', [  // Array
    body('email', "Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists()
],async (req, res)=>{

  // If there are errors , return BAD request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const{email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data ={
      user:{
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json(authToken);

  }catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server error");
  }
})

module.exports = router