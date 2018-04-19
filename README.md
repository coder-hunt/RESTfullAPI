# SchoolCom Second round conding task 
  [nodejs]: https://docs.npmjs.com/getting-started/installing-node
  [mlab]: http://docs.mlab.com/ops/

**Quick start guide list:**

  * [Install NodeJs][nodejs]
  * [Create mlab account for mongoDB][mlab]
  * Install jsonwebtoken and bcrypt module 
     * npm install jsonwebtoken
     * npm install bcrypt
     
 
**API check list**
  
  * http://localhost:3000/userlist 
     
     * This API is return all customer's list if the following conditions are matched 
       * Method : GET 
       * If user role is admin
       * If user is loggedIn then pass JWT token into header 
          Likes: https://drive.google.com/file/d/1Zu2J8KOgQIaAvjcqwvPZMq_Ol7gRemHz/view
       * If user is not loggedIn then this will return following response
          Links: https://drive.google.com/file/d/1hTq_3DeTljQP0KGzhCU0fYS9NtBNWlTu/view?usp=drivesdk
        
   * http://localhost:3000/auth/register
      * This API is used for register customer using following condition's
        * Method : PUT (reason for put methods here because we want to insert new resource )
        * In this API just pass header Content-Type: application/json or whatever you want in to response 
        * The purpose to use this API is to register user with the specific role like : user,admin
        * Please check Restlet Client schreenshot  for more clarification 
          Links: https://drive.google.com/file/d/1urhWZ7WmhViCsKUzNB6xd9ghC7Sg93l1/view?usp=drivesdk
          
   * http://localhost:3000/auth/login 
      * This API is used for login of the customer using the following condition 
        * Pass email/password of the customer header Content-Type: application/json or whatever you want in to response.
        * If the user is registered user then this will return JWT token with message : "Success"
        * If the user is not found then simply return message": "User not found."
        
  * http://localhost:3000/getUserDetails 
       * Method : GET 
       * This API return user details when user pass JWT token and email id of the customer based on the email id the data is return 
       * This API is return customer details only when the role of the user is admin
       * Pass emailId from query parameters 
         Links: https://drive.google.com/file/d/1Fw03ZzG60J8hkWfzV7hv4q0wsOLjQIwm/view?usp=drivesdk
    
  * http://localhost:3000/updateUser
       * Method : POST
       * Same condition's like getUserDetails API but where user and customer both can update data 
        Links: https://drive.google.com/file/d/1CInwrTVvdcPLCXvmuaFO1V_SMUDwVxNq/view?usp=drivesdk
        
  * http://localhost:3000/deleteUser 
       * Method : POST
       * This API is use to delete all customer from database 
       * The role of the user should be admin 
       * This just return { message: 'Customer record successfully deleted' } if user is admin otherwise 
         { message: "Unauthorised access" }
  
 
 Code Explanation : 
 
 * Middleware 
    * The purpose to add middleware here is to check if the user is passing JWT token or not 
      Before calling API 
    * If user passing JWT token then we assign the user is defined 
    * If user does not passing the JWT token the we assign the user is undefined 
      Links: https://drive.google.com/file/d/1nGQlXKOLxDuZSyUbsd34AsuWfHmgOnpU/view?usp=drivesdk
 
 * Routes: 
    * Check this links https://drive.google.com/file/d/1Oq-mtwhjhXxbd0PIFcRtO_klAYhsBE7A/view?usp=drivesdk
      for more information 
    * As you can see there is one function is called on most of API routes which is userHandlers.loginRequired 
      the purpose to user this function is that we want to disallow customer to access these API 
      directly these API is only and only access by the user if the user is login 
 
  Thanks for reading this document hope you enjoy this documents 
  feel free to ask if you have any doubts   
  