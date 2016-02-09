var path = require('path');
var express = require('express');
var User = require('../models/userModel');
var Twote = require('../models/twoteModel');

var routes = {};

routes.home = function(req, res){

  res.render("index");

}


module.exports = routes;