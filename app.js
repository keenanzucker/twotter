var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require('./models/userModel');

var auth = require('./auth');
var index = require('./routes/index');

var clientID = process.env.clientID || require('./auth').FACEBOOK_APP_ID;
var clientSecret = process.env.clientSecret || require('./auth').FACEBOOK_APP_SECRET;
var callbackURL = process.env.callbackURL || require('./auth').FACEBOOK_CALLBACK_URL;


passport.use(new FacebookStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
  	console.log('FB NAME', profile.displayName);
  	var username = profile.displayName;
  	console.log("NEW NAME:", username.split(' ').slice(0, -1).join(' '));
  	username = username.split(' ').slice(0, -1).join(' ');

  	if (username == ''){
    	console.log("NOT VALID");
  	} else {
  		User.findOne({username: username}, function(err, user){

    	if(err) console.log(err);
    	if (!user) {
      		var user = new User({
        	username: username,
        	logged: true
     	});
      	user.save(function(err, val){

        	if (err) console.log(err);
        	else {
          		console.log("User Logged in: " + username);
       		 }
      	});
    }
    else {
      console.log("User already in Database!");
    }
  });
 }
    done(null, username);
  }
));


passport.use(new LocalStrategy(
	function(username, password, done){


		if (username == ''){
    		console.log("NOT VALID");
  	} else {

  		User.findOne({username: username}, function(err, user){

    	if(err) console.log(err);
    	if (!user) {
      		var user = new User({
        	username: username,
        	password: password,
        	logged: true
     	});
      	user.save(function(err, val){

        	if (err) console.log(err);
        	else {
          		console.log("User Logged in: " + username);
       		 }
      	});
    }
    else {
      console.log("User already in Database!");
    }
  });
 }
    done(null, username);
	}
));

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/feed',
                                      failureRedirect: '/' })
);

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/feed');
  });

app.get('/', index.loginPage);
app.get('/feed', index.feed);
app.post('/new', index.newTwote);
app.post('/highlight', index.highlight);
app.get('/user', index.ensureAuthenticated);
app.get('/logout', index.logout);
app.post('/remove', index.remove);

mongoose.connect('mongodb://keenan:olinjs@ds033217.mongolab.com:33217/twotter', function(err){
	if(err) console.log(err);
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

module.exports = app;