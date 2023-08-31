const {getRegister, register, getLogin, login} = require('../controllers/auth.controller')
const router = require('express').Router()
const passport = require('passport')

router.get('/register', getRegister)
router.post('/register', register)

router.get('/login', getLogin)
router.post('/login', passport.authenticate('local'), (req, res)=>{
    res.redirect('profile')
})

module.exports = router