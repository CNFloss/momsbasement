"use strict";
require("dotenv").config();

// Database imports
const BLOG_POST = require("./schemas/blogSchema");

// Server imports
const PATH = require("path");

const EXPRESS = require("express");
const EXPHBS = require("express-handlebars");

const SERVER = EXPRESS();

SERVER.use(EXPRESS.static(PATH.join(__dirname, "assets")));

const MONGOOSE = require("mongoose");

MONGOOSE.connect(process.env.DATABASE, { useNewUrlParser: true }).then(
 
  () => { console.log("connected to datbase"); },
 
  err => { console.error(err); }
 
);

/*
let data = new BLOG_POST({
  title:"This is this first post",
  author:"Colin Floss",
  body:"Hopefully this works! I am trying to create a fully functioning HTTP Node server with Express, Mongodb, Mongoose and using frontend client endpoints of my own creation or possibely Vue,",
  date: Date.now()
});

data.save();
*/

const HBS = EXPHBS.create({
  defaultLayout: "main",
  partialsDir: [
    "views/partials"
  ]
});

SERVER.engine("handlebars", HBS.engine); // specify the views directory
SERVER.set("view engine", "handlebars"); // register the template engine

SERVER.get("/", (req, res) => {
  /*BLOG_POST.find().then(
      (doc) => {console.log(doc)},
      err => { console.err(err); }
    );*/
  //res.sendFile(__dirname + req.session.app);
  res.render("home", {title: "Home"});
  
});

SERVER.get("/portfolio", (req, res) => {
  /*BLOG_POST.find().then(
      (doc) => {console.log(doc)},
      err => { console.err(err); }
    );*/
  //res.sendFile(__dirname + req.session.app);
  res.render("portfolio", {title: "Portfolio"});
  
});

SERVER.get("/games", (req, res) => {
  res.render("games", {title: "Games", cssFile: "games"});
  
});

SERVER.listen(8080, () => console.log("server is running"));