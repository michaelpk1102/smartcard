const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')


const CONFIG = require('./config/env')

const app = express()



mongoose.connect(CONFIG.DB_URI)
    .then(()=>{
        app.use(express.static('public'))
        app.use(express.urlencoded({ extended: true }))
        app.use(require('cookie-parser')())
        app.use(require('express-session')({ 
            secret: CONFIG.APP_SECRET, 
            resave: true, 
            saveUninitialized: true 
        }));
        app.use(passport.initialize())
        app.use(passport.session())
        app.set("view engine", "ejs")

        
        
        // ROUTES
        app.use('/', require('./routes/auth.route'))

        // handles 404 error
        app.get('*', (req, res)=>{
            res.send("404 Page not found")
        })
        app.listen(CONFIG.APP_PORT, ()=>{
            console.log("app running")
        })
    })
    .catch((err)=>{
        console.error(err)
    })