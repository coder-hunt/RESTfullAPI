'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Balanced = mongoose.model('Balanced'),
    User = mongoose.model('User');

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined; //  to hide password response 
            return res.json(user);
        }
    });
};
exports.login = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Please enter valid password' });
            } else {
                return res.json({ token: jwt.sign({ _id: user._id, role: user.role, userName: user.userName }, 'schoolcom'), message: "success" });
            }
        }
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'You are not authorised' });
    }
};

exports.createUser = function (req, res) {
    console.log(req.user.role);
    if(req.user.role == 'admin'){
        var newUser = new User(req.body);
        newUser.save(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }else{
        res.json({message: "Unauthorised access"});
    }

};

exports.getUserDetails = function (req, res) {
    console.log(req.query.email);
    if(req.user.role == 'admin'){
        User.findOne({ email: req.query.email }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }else{
        res.json({message: "Unauthorised access"});
    }

};

exports.updateUser = function (req, res) {
    User.findOneAndUpdate(req.body.email, req.body, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.deleteUser = function (req, res) {
    if (req.user.role == "admin") {
        User.remove({
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Customer record successfully deleted' });
        });
    } else {
        res.json({ message: "Unauthorised access" });
    }

};

exports.getCustomerList = function (req, res) {
    if (req.user.role == "admin") {
        User.find({}, function (err, userList) {
            if (err)
                res.send(err);
            res.json(userList);
        });
    } else {
        res.json({ message: "Unauthorised access" });
    }
}

exports.balanced = function (req, res) {
    let input = req.body.input
    let checkBalanced = isBalanced(input);
    if (checkBalanced) {

        Balanced.findOne({userName:req.user.userName}, function (err, data) {
            if (err)
                res.send(err);
            if (data != null) {
                data.attempts = data.attempts + 1;
                data.save(function (err, updateData) {
                    if (err)
                        res.send(err);
                    res.json(updateData);
                });
            } else {
                let balancedString = new Balanced({ userName: req.user.userName, message: "balanced", attempts: 1 });
                balancedString.save(function (err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            }
        });
    } else {
        let balancedString = new Balanced({ userName: req.user.userName, message: "Unbalanced", attempts: 1 });
        balancedString.save(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }
}

function isBalanced(str) {
    if (str.length == 0) {
        return false;
    }
    let stack = [], ch;
    let openingBraces = ['[', '{', '('];
    let closingBraces = [']', '}', ')'];

    for (let i = 0; i < str.length; i++) {
        ch = str[i];
        if (closingBraces.indexOf(ch) > -1) {
            if (stack.length == 0 || (stack.pop() != openingBraces[closingBraces.indexOf(ch)])) {
                return false
            }
        } else {
            stack.push(ch);
        }
    }
    return (stack.length == 0);
}
