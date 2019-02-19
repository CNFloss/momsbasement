const MONGOOSE = require("mongoose");

const Schema = MONGOOSE.Schema;

const BlogSchema = new Schema({
  title: {type:String, required:true, lowercase:true, trim:true},
  author: {type:String, required:true, lowercase:true, trim:true},
  body: {type:String, required:true, lowercase:true, trim:true},
  date: {type: Date, required:true, default: Date.now()}
}, {collection:"BlogPosts"});

module.exports = MONGOOSE.model("blogpost", BlogSchema);