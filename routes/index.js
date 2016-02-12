var path = require('path');
var express = require('express');
var User = require('../models/userModel');
var Twote = require('../models/twoteModel');

var routes = {};

routes.home = function(req, res){

  res.render("index");

}

routes.feed = function(req, res){

  Twote.find().sort({time:-1}).exec(function(err, twotes){
    if (err) console.log(err);
    else {
      User.find().exec(function(err, users){
        if (err) console.log(err)
        else {
          res.render('index', {twotes: twotes, users: users});
          console.log("Showing Twotes and Users!")
        }
      });
    }
  });
}

routes.login = function(req, res){
  
  console.log(req.body.username);

  var user = new User({
    username: req.body.username
  });

  user.save(function(err, val){
    if (err) console.log(err);
    else {
      console.log("User Logged in: " + req.body.username);
      res.send(val);
    }
  });
}

routes.newTwote = function(req, res){

  console.log(req.body.text);

  var twote = new Twote({
    text: req.body.text,
    author: req.body.author
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

module.exports = routes;