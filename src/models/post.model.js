const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

  var schema = mongoose.Schema(
    {
      imageURL:{
        type: String,
        unique: false
      },
      amount:{
        type:Number,
      },
      description:{
        type:String
      },
      breed:{
        type:String
      },
      age:{
        type:String
      },
      item:{
        type:String
      },
      servicesType:{
        type:String
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      PostCategory:{
        type: mongoose.Schema.ObjectId,
        ref: "postCategory"
      }
    },
    { timestamps: true }
  );

  const Post = mongoose.model("post", schema);
  module.exports =  Post;