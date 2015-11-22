var mongoose = require('mongoose');
var UserModel = require('./user.model');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    UserModel.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new UserModel(req.body);
    newUser.save(function(err, user) {
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.get = function(req, res, next) {
    var userId = req.params.id;

    UserModel.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user);
    });
};

/**
 * Get a single user
 */
exports.getByUsername = function(req, res, next) {
    var username = req.params.username;

    UserModel.find({"username" : username}, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user);
    });
};

/**
 * Connects a street to a user
 */
exports.setStreet = function(req, res, next) {
    var userId = req.params.id;
    var streetId = req.params.sid;

    UserModel.findById(userId, function(err, user) {
        if (err) return next(err);

        console.log(streetId);
        user.adoptedStreets.push(mongoose.Types.ObjectId(streetId));
        console.log(JSON.stringify(user.adoptedStreets));
        user.save(function(err, user){

        });
        res.json(user);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {

};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {

};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    UserModel.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user);
    });
};

exports.update = function(req, res) {

};

exports.activate = function(req, res) {

};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
