const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const User = require('../../models/Users')
const router = express.Router()
const {check, validationResult} = require('express-validator')

// @rout POST api/users
// @desc User registration
// @access public

router.post('/',

    //Data validation from the frontend
    [
        check('name','Name is cannot be empty.').not().isEmpty(),
        check('email','Email must not be empty').isEmail(),
        check('password','Please enter a password').isLength({min:6})
    ],
    async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    //destructure body
    const {name,email,password} = req.body 

    //User registration
    try {
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({errors:[{message: 'User already exist'}]})
        }
        //generate a new avatar for a new user creation
        //s: size, r:radiance, d:default
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        //create an instance of a new user
        user = new User({
            name,email,avatar,password
        })

        //encrypt the password 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt)

        //save the new record
        await user.save()
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