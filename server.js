// Load required packages
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var jade = require('jade');

// Configure ejs for use in conjunction with Underscore

// Load controllers
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/backbone');

// Create our Express application
var app = express();
app.set('view engine', 'jade')

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


// Register all our routes with /api
app.use('/api', router);

// Route for handling /backbone
app.route('/backbone')
  .get(function(req, res) {
    res.render('backbone');
  });

// Routing for static directories
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));
app.use('/underscore', express.static(__dirname + '/bower_components/underscore'));
app.use('/backbone', express.static(__dirname + '/bower_components/backbone'));
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));

// Start the server
app.listen(3000);