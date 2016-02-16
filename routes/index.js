var path = require('path');
var express = require('express');
var User = require('../models/userModel');
var Twote = require('../models/twoteModel');

var routes = {};

routes.home = function(req, res){
  res.render("index");
}

routes.loginPage = function(req, res){

  res.render('login');

}

routes.feed = function(req, res){

  Twote.find().sort({time:-1}).exec(function(err, twotes){
    if (err) console.log(err);
    else {
      User.find().sort({time:-1}).exec(function(err, users){
        if (err) console.log(err)
        else {
          res.render('index', {twotes: twotes, users: users});
          console.log("Showing Twotes and Users!");
          console.log(req.user);
        }
      });
    }
  });
}

routes.highlight =function(req, res){

  clickId = req.body.id;

  User.findById(clickId, function(err, found){
    if (err) console.log(err);
    else {

      console.log('YOU CLICKED ON', found.username);
      res.send(found);
    }
  });
}

routes.login = function(req, res){
  
  username = req.body.username;
  console.log(username);

  if (username == ''){
    console.log("NOT VALID");
    res.status(500);
    res.send("No username given");
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
          res.send(val);
        }
      });
    }
    else {
      console.log("User already in Database!");
      res.send({logged: false});
    }
  });
 }
}

routes.newTwote = function(req, res){

  console.log(req.body.text);
  text = req.body.text;
  author = req.body.author;

  var twote = new Twote({
    text: text,
    author: author
  });
  console.log(twote);
  
  twote.save(function(err, val){
    if (err) console.log(err);
    else{
      console.log("New Twote: " + req.body.text + " By:" + req.body.author);
      res.send(val);
    }
  });
}

routes.ensureAuthenticated = function(req, res) {

  res.send({username:req.user});
};

routes.failure = function(req, res){
  res.render('failure');
}

module.exports = routes;