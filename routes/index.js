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
      User.find().sort({time:-1}).exec(function(err, users){
        if (err) console.log(err)
        else {
          res.render('index', {twotes: twotes, users: users});
          console.log("Showing Twotes and Users!")
        }
      });
    }
  });
}

routes.highlight =function(req, res){

  clickId = req.body.id;

  // console.log('YOU CLICKED ON: ', clickId);

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

module.exports = routes;