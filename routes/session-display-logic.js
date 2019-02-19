const EXPRESS = require("express");

const router = module.exports = EXPRESS.Router();

const displayMap = {
  main: (function() {
    return ({
      path: "/web_apps/mainwebapplication/index.html"/*,
      views: {
        home: {},
        loader: {},
        games: {},
        portfolio: {}
      }*/
    });
  })()
};

function displayDispatch(key) {
  return displayMap[key];
}

router.use((req, res, next) => {

  let {app, view, spot} = req.session.meta.current;
  console.log(app, view, spot, req.session.meta.requestQueue, displayDispatch(app));

  if (displayDispatch(app)) {
    req.session.app = displayDispatch(app).path;
  }
  else {
    console.log("session current app not set");
    req.session.app = displayMap.main;
  }

  next();
});