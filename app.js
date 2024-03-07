const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const { flash } = require('express-flash-message');
const mongoose = require('mongoose');
const { connectToDB } = require('./server/database/db');

const { config } = require('dotenv');
const morgan = require('morgan');
const path = require('path');

config({path: './config.env'});

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to Database
connectToDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public')); 


// Express Session
app.use(
    session({
        resave: false,
        secret: process.env.sessionSecret,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            // secret: true
        },
    })
);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage'}));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// log requests 
app.use(morgan('tiny'));

// Routers
const customerRouter = require('./server/routes/customer');



// Routes
app.get('/', customerRouter);
app.get('/add', customerRouter);
app.get('/view/:id', customerRouter);
app.get('/edit/:id', customerRouter);
app.get('/about', customerRouter);
app.post('/add', customerRouter);
app.post('/search', customerRouter);
app.patch('/edit/:id', customerRouter);
app.delete('/delete/:id', customerRouter);

// Handle non-existent routes
app.all('*', (req, res) => {
    res.status(404).render('invalid-route')
})


mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`)
    })
})
