const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

  var schema = mongoose.Schema(
    {
      name:{
        type: String,
        unique: false
    },
    fullName: {
        type: String,

        unique: false
    },
    country: {
        type:String,
    },
    state: {
        type: String
    },
    userType:{
        type: String,
        enum: ['clinic', 'store', 'individual']
    },
    email: {
        type: String,

        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        unique: false
    },
    photo: {
        type: String,
        unique: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,

        unique: false
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
    }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, password, ...object } = this.toObject();
    const newObject = {
        id: _id,
        ...object
    }
    return newObject;
  });

  const User = mongoose.model("user", schema);
  module.exports =  User;