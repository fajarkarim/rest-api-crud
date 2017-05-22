"use strict";
const user = require('../models/').user;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

var getAllUsers = ((req,res,next) => {
  user.findAll()
    .then (users => {
      res.send(users);
    });
});

var getUser = ((req,res,next) => {
  let id = req.params.id;
  user.findById(id)
    .then (user => {
      res.send(user);
    });
});

var createUser = ((req,res,next) => {
  bcrypt.hash(req.body.email, saltRounds, (err,hash) => {
    let userData = {
      username: req.body.username,
      password: hash,
      email: req.body.email,
      role: req.body.role
    };
    user.create(userData)
      .then ((userData) => {
        res.send(`New user is created: ${userData}`);
      });
  });
});

var deleteUser = ((req,res,next) => {
  let id = req.params.id;
  user.destroy({where: {id:id}})
    .then (() => {
      res.send (`User ${id} is deleted.`);
    });
});

var updateUser = ((req,res,next) => {
  let id = req.params.id;
  user.findById(id)
    .then ((user) => {
      let userData = {
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        password: req.body.password || user.password,
        role: req.body.role || user.role
      };
      user.update(userData)
        .then (() => {
          res.send(`User ${id} is updated.`);
        });
    });
});


var loginUser = ((req,res,next) => {
  user.find({where:{username: username}})

});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser
};