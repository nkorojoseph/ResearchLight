const express = require('express');
const connectDB = require('../config/db')
const bodyparser = require('body-parser')

const app = express();

const PORT = process.env.PORT || 5000;

//test server connection
app.get('/', (req, res) => {
    res.send('Server setup done properly');
});

//connect to db
connectDB()

//initialize Middleware  for user registration
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

//test server connection
app.get('/', (req, res) => {
    res.send('Server setup done properly');
});

///define routes
app.use('/api/users',require('../routes/api/users'))
app.use('/api/auth',require('../routes/api/auth'))
app.use('/api/posts',require('../routes/api/posts'))
app.use('/api/profile',require('../routes/api/profile'))

app.listen(PORT, () => console.log('Server running on PORT:',PORT));