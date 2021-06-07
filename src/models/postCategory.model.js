const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

  var schema = mongoose.Schema(
    {
      name:{
        type: String,
        unique: false
    }
    },
    { timestamps: true }
  );

  const PostCategory = mongoose.model("postCategory", schema);
  module.exports =  PostCategory;