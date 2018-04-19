var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
  jsonwebtoken = require("jsonwebtoken");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://school:school@ds249079.mlab.com:49079/schoolcom');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next){

  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]=='JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'schoolcom',function(err, decode){
      if(err){
        console.log(err);
        req.user = undefined;
      }
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  };
});
var routes = require('./api/routes/todoListRoutes');
routes(app);


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

