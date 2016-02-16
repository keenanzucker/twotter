var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var User = require('./models/userModel');


var auth = require('./auth');
var index = require('./routes/index');

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },

  function(accessToken, refreshToken, profile, done) {
  	// DO THE STUFF LIKE SAVING USERS

  	console.log('FB NAME', profile.displayName);

  	var username = profile.displayName;

  	if (username == ''){
    	console.log("NOT VALID");
    	// res.status(500);
    	// res.send("No username given");
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
          // res.send(val);
        }
      });
    }
    else {
      console.log("User already in Database!");
      // res.send({logged: false});
    }
  });
 }
    done(null, profile.displayName);
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

app.get('/', index.loginPage);
app.get('/feed', index.feed);
app.post('/new', index.newTwote);
app.post('/login', index.login);
app.post('/highlight', index.highlight);
app.get('/user', index.ensureAuthenticated);
app.get('/failure', index.failure);


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