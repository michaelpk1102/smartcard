require('dotenv').config()


const CONFIG = {
    APP_PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI,
    APP_SECRET: process.env.APP_SECRET,
}


module.exports = CONFIG