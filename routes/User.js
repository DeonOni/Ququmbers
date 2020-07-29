const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
let User = require('../models/User');
let JsonResponseBuilder = require('../JsonResponseBuilder');

var router = express.Router();
router.use(express.json());

// sign up route
router.post('/', function(req, res) {
    var responseBuilder = new JsonResponseBuilder();
    responseBuilder.setPayload(req);
    User.find({email: req.body.email}, function(err, user) {
        if (err) {  // error
            responseBuilder.setMessage('An error occured while searching for user');
            responseBuilder.setStatus(500);
            return res.send(responseBuilder.build());
        }
        if (user) {  // user already exists
            responseBuilder.setMessage('User with this e-mail already exists');
            responseBuilder.setStatus(403);
            return res.send(responseBuilder.build());
        }
        var newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, config.secret)
        });
        newUser.save(function(err) {
            if (err) {  // error while saving
                responseBuilder.setMessage('An error occured while saving new user, try again');
                responseBuilder.setStatus(422);
                return res.send(responseBuilder.build());
            }
        });
        responseBuilder.setData({
            name: user.name,
            email: user.email
        });
        return res.send(responseBuilder.build());
    });
});

// sign in route
router.get('/', function(req, res) {
    var responseBuilder = new JsonResponseBuilder();
    responseBuilder.setPayload(req);
    User.find({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            responseBuilder.setMessage('An error occured while searching for user');
            responseBuilder.setStatus(500);
            return res.send(responseBuilder.build());
        }
        if (user) {
            responseBuilder.setData({
                user: {
                    name: user.name,
                    email: user.email
                },
                token: jwt.sign({email: user.name}, config.secret)
            });
            return res.send(responseBuilder.build());
        }
        responseBuilder.getMessage('Wrong e-mail or password');
        responseBuilder.setStatus(404);
        return res.send(responseBuilder.build());
    });
})

// authentification route
router.get('/authentification', function(req, res) {
    var responseBuilder = new JsonResponseBuilder();
    responseBuilder.setPayload(req);
    var token = req.headers['authorization'];
    jwt.verify(token, config.secret, function(err, decodedToken) {
        if (err) {
            responseBuilder.setMessage('Wrong jwt token');
            responseBuilder.setStatus(401);
            return res.send(responseBuilder.build());
        }
        return res.send(responseBuilder.build());
    });
});
