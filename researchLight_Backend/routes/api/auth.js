const express = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const User = require('../../models/Users')

const router = express.Router()


// @route GET api/users
// @desc | Test users route
// @access public

router.get('/',auth, async (req,res)=>{
    //respond with users record

    try {
        //leave off the password with -password in the select
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) { 
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// Login api endpoint
// @route POST api/users 
// @desc User registration
// @access public
router.post('/',

    //Data validation from the frontend
    [
        check('email','Email must not be empty').isEmail(),
        check('password','Password is required').exists()
    ],
    async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: error.array() })
    }

    //destructure body
    const {email,password} = req.body 

    //User login
    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({errors:[{message: 'Invalid login details'}]})
        }
        
        const findMatch = await bcrypt.compare(password,user.password)

        if (!findMatch) {
            return res.status(400).json({errors:[{message:"Invalid Login details"}]})
        }

        /**
         * Generate jswebtoken to access protected routes
         */

         //create a webtoken payload with the user id or _id from mongodb
        const payload = {
            user: {
                id: user.id
            }
        }
        //sign the webtoken with payload,config, jwtsecret(from the default config file)
        jwt.sign(
        payload,
        config.get('jwtSecret'),{
            expiresIn: 360000
        }, 
        //creeate a callback with the token and the error message if any
        (err,token)=>{
            if (err) {throw err}
            res.json({token})
        })

       // res.send('User registration successful')
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error.')
    }
})

module.exports = router