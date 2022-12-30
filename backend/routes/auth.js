const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator');

const User = require('../models/User')
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
    //Check whether theuser with this email exist already
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "User Already exist"});
    }
    user =  await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    user.save();
    // .then(user => res.json(user))
    // .catch(err=> console.log(err));

    res.send(req.body);
})

module.exports = router