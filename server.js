"use strict";
require("dotenv").config();

// Database imports
const BLOG_POST = require("./schemas/blogSchema");

// Server imports
const EXPRESS = require("express");
const SESSION_UPDATER = require("./routes/session-updater");
const SESSION_DISPLAY_LOGIC = require("./routes/session-display-logic");

const SERVER = EXPRESS();

SERVER.use(SESSION_UPDATER);
SERVER.use(SESSION_DISPLAY_LOGIC);

SERVER.use(EXPRESS.static(__dirname + "/web_apps"));

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

// Custom Template Engine
SERVER.set("views", "./views"); // specify the views directory
SERVER.set("view engine", "pug"); // register the template engine

SERVER.get(/w*/, (req, res) => {

  if (req.session.meta.kill) {
    req.session.meta.kill = false;
    res.redirect("/");
  } 
  else {
    /*BLOG_POST.find().then(
      (doc) => {console.log(doc)},
      err => { console.err(err); }
    );*/
    //res.sendFile(__dirname + req.session.app);
    let temp = {
      kill: req.session.meta.kill,
      stylesheet: "/web_apps/templategame/assets/css/style.css"
    };
    res.render("index", temp);
  }

});

SERVER.listen(8080, () => console.log("server is running"));