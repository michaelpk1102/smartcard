const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    avatar:{
        type: String,
        required: true,
        default: "default.png"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("User", UserSchema);


