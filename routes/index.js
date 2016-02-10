var path = require('path');
var express = require('express');
var User = require('../models/userModel');
var Twote = require('../models/twoteModel');

var routes = {};

routes.home = function(req, res){

  res.render("index");

}

routes.feed = function(req, res){

  Twote.find().sort({time:-1}).exec(function(err, data){
    if (err) console.log(err);
    else{
      res.render('index', {twotes: data});
      console.log("Showing Twotes!")
    }
  });
}

routes.newTwote = function(req, res){

  console.log(req.body.name);

  var twote = new Twote({
    name: req.body.name
  });
  console.log(twote);
  twote.save(function(err, val){
    if (err) console.log(err);
    else{
      console.log("New Twote: " + req.body.name);
      res.send(val);
    }
  });
}


module.exports = routes;