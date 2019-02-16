"use strict";

define("sprite", ["components/staticPhysics",
                  "components/move",
                  "components/render",
                  "components/rayCast",
                  "components/physicsUpdate"],
                  function(staticPhysics, move, render, rayCast, physicsUpdate){

  const sprite = (seed = {x:0, y:0, width:64, height:64, color:"black"}) => {
    let temp;
    let locals = {
      x: seed.x,
      y: seed.y,
      width: seed.width,
      height: seed.height,
      id: seed.id || "sprite",
      color: seed.color,
      image: undefined,
      filename: seed.filename,
    }
    // Logic for final choosen sprite object returned
    if (seed.id  === "player") {
      locals.velocity_x = 0;
      locals.velocity_y = 0;
      locals.predictX = seed.x;
      locals.predictY = seed.y;
      locals.originX = seed.x;
      locals.originY = seed.y;
      locals.blocked = false;
      locals.onGround = false;
      locals.jumping = false;
      locals.jumpStamp = 0.0;
      locals.lastDir = {x:0, y:0};
      temp = Object.assign(locals, render(locals), move(locals), rayCast(locals), physicsUpdate(locals));
      temp.init();
    }
    else if (seed.id  === "TBSunit") {
      locals.velocity_x = 0;
      locals.velocity_y = 0;
      locals.predictX = seed.x;
      locals.predictY = seed.y;
      locals.originX = seed.x;
      locals.originY = seed.y;
      locals.blocked = false;
      locals.lastDir = {x:0, y:0};
      locals.counter = 0;
      locals.selected = false;
      temp = Object.assign(locals, render(locals), move(locals));
      temp.init();
    }
    else if (seed.id === "obstacle") {
      temp = Object.assign(locals, render(locals), staticPhysics(locals));
    }
    else {
      temp = Object.assign(locals, render(locals));
    }
    return temp;
  }

  return sprite;

})
