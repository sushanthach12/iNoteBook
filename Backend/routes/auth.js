const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = 'Sushanthisagoodb$oy'


//Route 1 : Create a user using: POST "/api/auth/createuser" .No login required

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 words').isLength({ min: 5 }),

], async (req, res) => {

    //if there are errors, return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // User create
    try {
        let success = false;
        // Check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true

        res.json({ "Success":success, "authToken": authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
})


// Route 2: Authenticate a user using: POST "/api/auth/login" .No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    try {

        //if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        let success = false;


        // Check whether the user with this email exist already
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login using correct credentials" })
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login using correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({"Success":success, "authToken": authToken });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
})


// Route 3: get loggedin user details using: POST "/api/auth/getUser" , login required

router.post('/getUser', fetchuser, async (req, res) => {

    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        res.send(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }

});

module.exports = router; 