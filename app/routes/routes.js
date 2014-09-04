'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    passportConfig = require('../lib/passport/config'),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home'),
    products       = require('../controllers/products'),
    cart           = require('../controllers/cart'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);
  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login',                 users.login);
  app.post('/login',                passport.authenticate('local',   {successRedirect:'/', failureRedirect:'/login', successFlash:'Successful Local Login!',   failureFlash:'Sorry, your local login was incorrect.'}));
  app.get('/auth/twitter',          passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect:'/', failureRedirect:'/login', successFlash:'Successful Twitter Login.', failureFlash:'Sorry, your twitter login was incorrect.'}));
  app.get('/auth/github',           passport.authenticate('github'));
  app.get('/auth/github/callback',  passport.authenticate('github',  {successRedirect:'/', failureRedirect:'/login', successFlash:'Successful Github Login.',  failureFlash:'Sorry, your github login was incorrect.'}));
  app.get('/auth/google',           passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback',  passport.authenticate('google',  {successRedirect:'/', failureRedirect:'/login', successFlash:'Successful Google Login.',  failureFlash:'Sorry, your google login was incorrect.'}));
  app.get('/auth/spotify',          passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}));
  app.get('/auth/spotify/callback', passport.authenticate('spotify', {successRedirect:'/', failureRedirect:'/login', successFlash:'Successful Spotify Login.', failureFlash:'Sorry, your spotify login was incorrect.'}));

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.get('/profile', users.show);
  app.get('/profile/edit', users.edit);
  app.put('/profile', users.update);
  app.get('/products', products.index);
  app.post('/cart', cart.add);
  app.get('/cart', cart.index);
  app.delete('/cart', cart.destroy);
  app.post('/charge', cart.purchase);

  console.log('Express: Routes Loaded');
};

