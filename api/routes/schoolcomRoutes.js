
module.exports = function (app) {

  var userHandlers = require('../controllers/userController.js');
  
  app.route('/userlist')
     .get(userHandlers.loginRequired, userHandlers.getCustomerList);
  app.route('/createUser') // Create user from database 
     .put(userHandlers.loginRequired, userHandlers.createUser);
  app.route('/getUserDetails') // Read user's details from database 
     .get(userHandlers.loginRequired, userHandlers.getUserDetails);
  app.route('/updateUser') // update existing user's details from database  
     .post(userHandlers.loginRequired, userHandlers.updateUser);
  app.route('/deleteUser') // delete user's details from database 
     .delete(userHandlers.loginRequired, userHandlers.deleteUser);
  app.route('/auth/login')  // Login user
     .post(userHandlers.login);
  app.route('/auth/register') // Register user 
     .put(userHandlers.register);

  app.route('/balanced')
     .post(userHandlers.loginRequired,userHandlers.balanced);

};