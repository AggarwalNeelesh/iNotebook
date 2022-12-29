const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator');

const User = require('../models/User')
// Create a User using : POST "/api/auth" . Dosen't require Auth

router.post('/', [  // Array
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 4 })
],(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user))
    .catch(err=> console.log(err));

    res.send(req.body);
})

module.exports = router