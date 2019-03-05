const EXPRESS = require("express");

const router = module.exports = EXPRESS.Router();

const displayMap = {
  main: (function() {
    return ({
      path: "/index.pug"/*,
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
    req.session.meta.current = displayDispatch(app).path;
  }
  else {
    console.log("session current app not set");
    req.session.meta.current = displayMap.main;
  }

  next();
});