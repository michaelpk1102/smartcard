const { createUser, loginUser } = require('../services/auth.service')


const getRegister = (req, res)=>{
    res.render('auth/register', {title: "Register"})
}



const register  = (req, res)=>{
    const {name, email, password} = req.body 
    createUser(name, email, password)
    res.redirect('/register')
}


const getLogin = (req, res)=>{
    res.render('auth/login', {title: "Login"})
}

const login = (req, res)=>{
    loginUser()
}

module.exports = {
    getRegister,
    register,
    getLogin, 
    login
}