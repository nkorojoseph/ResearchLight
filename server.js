const express = require('express');
const connectDB = require('./config/db')
const bodyparser = require('body-parser')
const path = require('path');
const { json } = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

//connect to db
connectDB()

//initialize Middleware  for user registration
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));


///define routes
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/profile',require('./routes/api/profile'))

//Serve static assets in production
 if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'))

    app.get('/*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build','index.html'))
    })

 }



app.listen(PORT, () => console.log('Server running on PORT:',PORT));