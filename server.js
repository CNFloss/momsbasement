"use strict";

const EXPRESS = require("express");

const SERVER = EXPRESS();

SERVER.use(EXPRESS.static(__dirname + "/web_apps"));

SERVER.get(/w*/, (req, res) => {

  res.sendFile(__dirname + "/web_apps/mainwebapplication/index.html");

});

SERVER.listen(8080, () => console.log("server is running"));