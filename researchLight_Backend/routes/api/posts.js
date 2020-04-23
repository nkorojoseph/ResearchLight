const express = require('express')
const {check, validationResult} = require('express-validator')

const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const User = require('../../models/Users')
const Profile = require('../../models/Profile')

const router = express.Router()
// @rout POST api/post
// @desc Create a post
// @access private

router.post('/',
    [auth,
        [
            check('text','Post cant be empty').not().isEmpty()
        ]
    ],async (req,res)=>{
        const errors = validationResult(req)
        try {
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            //search for the user posting the work. and specified fields you want/dont_want using .select()
            const user = await User.findById(req.user.id).select('-password')
            
            //setup variable for a new post.
            const newPost = new Post({
                text : req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })
            //save the new post 
            const post = await newPost.save()
            //return the posts including the newly posted content. 

            res.json(post)


        } catch (errors) {
            console.error(errors.message)
            res.status(400).send('Server Error')
        }       
})

// @route GET api/posts
// @desc Get all posts
// @access private
router.get('/',auth,async (req,res)=>{
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch (error) {
        console.error(errors.message)
        res.status(400).send('Server Error')
    }
})

// @route GET api/posts/?id
// @desc Get post by id
// @access private
router.get('/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        res.json(post)
    } catch (error) {
        if(error.kind == undefined){
            return res.status(404).json({message: 'Post not found'})
        }
        res.status(400).send('Server Error')
    }
})

// @route DELETE api/posts/?id
// @desc Delete post by id
// @access private
router.delete('/:id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        //check if the user trying to delete a post is the creator of the post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({message: 'User not authorized to delete this post '})
        }
        //check if post exists
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        //if it exists remove it. 
        await post.remove()
        res.json({message: 'Post deleted'})
    } catch (error) {
        if(error.kind == undefined){
            return res.status(404).json({message: 'Post not found'})
        }
        res.status(400).send('Server Error')
    }
})

// @route PUT api/posts/like/:id
// @desc Like a post by id
// @access private

router.put('/like/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({message: 'Post already liked by you'})
        }
        //add unto the post a new like
        post.likes.unshift({user: req.user.id })

        await post.save()

        res.json(post.likes)
        
    } catch (error) {
        if(error.kind == undefined){
            return res.status(404).json({message: 'Like failed due to server failure'})
        }
        res.status(500).send('Server Error')
    }
})

// @route PUT api/posts/unlike/:id
// @desc  Like a post by the post id
// @access private

router.put('/posts/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({message: 'Post has not been liked'})
        }
        //remove a post
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex,1)

        await post.save()

        res.json(post.likes)
        
    } catch (error) {
        if(error.kind == undefined){
            return res.status(404).json({message: 'Unlike failed due to server failure'})
        }
        res.status(500).send('Server Error')
    }
})

// @rout POST api/posts/comment/:id
// @desc Comment on a post by the post id
// @access private
router.post('/comment/:id',
    [auth,
        [
            check('text','Post cant be empty').not().isEmpty()
        ]
    ],async (req,res)=>{
        const errors = validationResult(req)
        try {
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            //search for the user posting the work. and specified fields you want/dont_want using .select()
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            //setup variable for a new post.
            const newComment = {
                text : req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            //add the comment to a post
            post.comments.unshift(newComment)

            //save the new post 
            await post.save()
            //return the posts including the newly posted content. 

            res.json(post.comments)


        } catch (errors) {
            console.error(errors.message)
            res.status(400).send('Server Error')
        }       
})

// @rout DELETE api/posts/comment/:id/:comment_id
// @desc Delete a comment on a post by the post id and comment id
// @access private
router.delete('/comment/:id/:comment_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        //pull out comments from a post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        //confirm if comments exists
        if(!comment){
            return res.status(404).json({message: 'Comment does not exist'})
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({message: 'User not authorized'})
        }
        const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex,1)

        
        await post.save()

        res.json(post.comments)
    } catch (error) {
        if(error.kind == undefined){
            return res.status(404).json({message: 'Comment failed due to server error'})
        }
        res.status(400).send('Server Error')
    }
})

module.exports = router