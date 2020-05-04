const express = require('express')
const request = require('request')
const config = require('config')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/Users')
const {check, validationResult} = require('express-validator')


const router = express.Router()

// @route GET api/profile/me
// @desc | get current profile of the logged in user
// @access private

router.get('/me',auth,async (req,res)=>{
    try {
        //search with the userId that comes with the token sent from the frontend
        const profile = await Profile.findOne({user: req.user.id}).populate('users',
        ['name','avatar'])
        if(!profile){
            return res.status(400).json({message: 'There is no profile for the user'})
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route POST api/profile
// @desc | Create profile for a new user
// @access private

router.post( '/', [
        auth,
        [
            check('status','Status is required').not().isEmpty(),
            check('skills','Skills is required').not().isEmpty()
        ]
    ],
    async (req,res)=>{
        //get all error messages from the express-validator
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
        }
        const {
            company,website,location,bio,status,githubusername,skills,
            youtube,facebook,twitter,instagram,linkedin,education
        } = req.body

        const profileFields = {}
        profileFields.user = req.user.id
        if(company) profileFields.company = company
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(githubusername) profileFields.githubusername = githubusername
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube
        if(twitter) profileFields.social.twitter = twitter
        if(instagram) profileFields.social.instagram = instagram
        if(facebook) profileFields.social.facebook = facebook
        if(linkedin) profileFields.social.linkedin = linkedin

        if(education) profileFields.education.school = education
       
        try {
           let profile = await Profile.findOne({user: req.user.id}) 
           //update a profile
           if(profile) {
               profile = await Profile.findOneAndUpdate(
                   {user:req.user.id},
                   {$set: profileFields},
                   {new : true}
                   
                ) 
                return res.json(profile);
           }

           //create new profile
           profile = new Profile(profileFields)

           await profile.save()

           res.json(profile)

           return res.json(profile)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error")
        }
 
    }
)


//@access public
//@desc  get all profiles
//@route GET api/profile/
router.get('/', async (req,res)=>{
    try {
        const profiles = await Profile.find().populate('users',['name','avatar'])
        res.json(profiles)
    } catch (error) {
        console.error(error.message) 
        res.status(500).send('Server Error')
    }
})


//@access public
//@desc  get a profiles
//@route GET api/profile/user/:user_id
router.get('/user/:user_id', async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('users',['name','avatar'])
        if(!profile) return res.status(400).json({message:'User profile not found'})
        res.json(profile)
    } catch (error) {
        console.error(error.message) 
        if(error.kind == undefined){
            return res.status(400).json({message:'User profile not found'})
        }
        res.status(500).send('Server Error')
    }
})


//@access public
//@desc  Delete a profile, user and post
//@route DELETE api/profile/
router.delete('/', auth, async (req,res)=>{
    try {
            await Profile.findOneAndRemove({user: req.user.id})

            await User.findOneAndRemove({user: req.user.id})

            res.json({message: 'User removed'})
    } catch (error) {
        console.error(error.message) 
        res.status(500).send('Server Error')
    }
})

//@access private
//@desc  add a profile experience
//@route PUT api/profile/

router.put('/experience',[auth,
    [ check('title','Title is require').not().isEmpty(),
        check('company','Company is required').not().isEmpty(),
        check('from','From date is required')
    ],
    async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            title, company,location,from,to,current,description
        } = req.body

        const newExp = {
            title, company,location,from,to,current,description
        }

        try {

            //find the profile you want to add the education to
            const profile = await Profile.findOne({user: req.user.id})
            //using unshift to push the new education to the beginning
            profile.experience.unshift(newExp)
            
            await profile.save()

            res.json(profile)
        } catch (error) {
           console.error(error.message)
           res.status(500).send('Server Error') 
        }
    }
])

//@access private
//@desc  delete a profile education from profile
//@route PUT/DELETE api/profile/

router.delete('/education/:exp_id',auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //Get education to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id)

        //remove the education index 
        profile.education.splice(removeIndex,1)

        //resave
        await profile.save()

        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error') 
    }
})

//@access private
//@desc  add a profile education
//@route PUT api/profile/

router.put('/education',[auth,
    [ check('school','School is require').not().isEmpty(),
        check('degree','Degree is required').not().isEmpty(),
        check('fieldofstudy','Field of study is required')
    ],
    async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            school, degree,fieldofstudy,from,to,current,description
        } = req.body

        const newEdu = {
            school, degree,fieldofstudy,from,to,current,description
        }

        try {

            //find the profile you want to add the education to
            const profile = await Profile.findOne({user: req.user.id})
            //using unshift to push the new education to the beginning
            profile.education.unshift(newEdu)
            
            await profile.save()

            res.json(profile)
        } catch (error) {
           console.error(error.message)
           res.status(500).send('Server Error') 
        }
    }
])

//@access private
//@desc  delete a profile education from profile
//@route PUT/DELETE api/profile/

router.delete('/education/:edu_id',auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //Get education to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        //remove the education index 
        profile.education.splice(removeIndex,1)

        //resave
        await profile.save()

        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error') 
    }
})

//@access public
//@desc  get user repos from github
//@route GET api/profile/gitbhub/:username

router.get('/github/:username',async (req,res)=>{
    try {
            const options = {
                uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
                &client_id=${config.get('githubClientId')}&clientSecret=${config.get('githubSecret')}`,
                method:'GET',
                headers: {'user-agent': 'node-js'}
            }
        request(options,(error,response,body)=>{
            if(error) console.error(error)

            if(response.statusCode !=200){
               return  res.status(400).json({message:'No github user found'})
            }
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error') 
    }
})

module.exports = router