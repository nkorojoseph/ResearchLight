const express = require('express');
const connectDB = require('../config/db')
const bodyparser = require('body-parser')
const path = require('path')

const app = express();

const PORT = process.env.PORT || 5000;

//connect to db
connectDB()

//initialize Middleware  for user registration
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));


//Serve static assets in production
// if(process.env.NODE_ENV === 'production'){

    app.use(express.static('../../researchlight_Webclient/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, '../../researchlight_Webclient','build','index.html'))
    })


///define routes
app.use('/api/users',require('../routes/api/users'))
app.use('/api/auth',require('../routes/api/auth'))
app.use('/api/posts',require('../routes/api/posts'))
app.use('/api/profile',require('../routes/api/profile'))


app.listen(PORT, () => console.log('Server running on PORT:',PORT));