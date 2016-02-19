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

  console.log('FROM THE SERVER: ', req.user);

  Twote.find().sort({time:-1}).exec(function(err, twotes){
    if (err) console.log(err);
    else {
      User.find().sort({time:-1}).exec(function(err, users){
        if (err) console.log(err)
        else {
          res.render('index', {twotes: twotes, users: users, currentUser: req.user});
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

routes.logout = function(req,res)
{
  console.log("something");
  req.logout();
  res.redirect('/');
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

routes.remove = function(req, res){
  console.log(req.body.idToDelete)
  Twote.findOne({'_id':req.body.idToDelete}).remove(function(err, val){
    if (err) console.log(err);
    else{
      console.log("Twote with id " + req.body.idToDelete + " deleted.");
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