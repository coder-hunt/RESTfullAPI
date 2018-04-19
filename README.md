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
       * If user is loggedIn then pass JWT token into header 
          Like: https://drive.google.com/file/d/1Zu2J8KOgQIaAvjcqwvPZMq_Ol7gRemHz/view
       * If user is not loggedIn then this will return following response
          Link: https://drive.google.com/file/d/1hTq_3DeTljQP0KGzhCU0fYS9NtBNWlTu/view?usp=drivesdk
        
   *
       