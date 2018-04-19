'use strict'

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{
       type: String,
       unique: true,
       lowercase: true,
       trim: true,
       required: true
    },
    password: {
        type: String,
        required: true
    },
    dob:{
      type: Date,
      required: true
    },
   userName: {
       type: String,
       required: true
   },
   role:{
       type: String,
       required: true
   }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User',UserSchema);

var BalancedSchema = new Schema({
  userName:{
      type:String,
      required: true
  },
  message:{
      type: String,
      required: true
  },
  attempts:{
      type: Number,
      default: 0
  }
});

mongoose.model('Balanced',BalancedSchema);
