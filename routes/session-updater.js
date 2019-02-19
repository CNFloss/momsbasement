const PARSEURL = require("parseurl");

const EXPRESS = require("express");

const router = module.exports = EXPRESS.Router();

router.use(require("express-session")({

  secret: new Date().getTime().toString(),
  resave: false,
  saveUninitialized: true

}));

router.use((req, res, next) => {
  let reqUrlPath = PARSEURL(req).pathname;
  
  if (!req.session.meta) {
    if (reqUrlPath !== "/") {
      req.session.meta = { kill:true };
    }
    else {
      req.session.meta = {
        assetRequests: [],
        history: [{app:"main", view:"loader", spot:null}],
        requestQueue: [reqUrlPath],
        kill: false
      };
      req.session.meta.current = req.session.meta.history[0];

      req.session.meta.assetRequests.push(reqUrlPath);
      console.log("new session");
    }
  }
  else {
    if (reqUrlPath === "/favicon.ico") {
      return;
    }
    if (req.session.meta.assetRequests.indexOf(reqUrlPath) === -1) {
      req.session.meta.assetRequests.push(reqUrlPath);
    }
    req.session.meta.requestQueue.push(reqUrlPath);
  }

  next();
});