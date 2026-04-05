const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/index')
const session = require('express-session') 
const sessionStorage = require('../util/sessionStorage')
const passport = require('passport')
const cors = require('cors')
const auth  = require('../middleware/auth');

//Enable CORS for all routes
router.use(cors({
  origin: 'http://localhost:3000', // Allow only React app
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

router.use(session({
    secret: 'alura',
    resave: false,
    saveUninitialized: false,
    store: sessionStorage
  }))

router.use(bodyParser.urlencoded({ extended: true }))

router.use(passport.initialize())
router.use(passport.session())
require('../passport-config')

//router.put 
//router.patch
//router.delete

// This route uses your 'protect' middleware to check the cookie
router.get('/verify', auth.protect, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});
router.get('/', auth.isGuest, controller.showIndex)
router.post('/', auth.isGuest, controller.login)//auth.protect,
router.get('/signup', controller.showPageSignUp)
router.post('/signup', controller.signup)
router.get('/members', controller.checkAuth, controller.showMembersPage)
router.get('/store', auth.protect, controller.showStore)
router.get('/products', controller.showPageProducts)
router.post('/products', controller.addProducts)
router.post('/orders', controller.order)
router.get('/logout', controller.logout)
router.post('/logout', controller.logout)
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/members');
  });
router.use(controller.get404Page)

module.exports = router
