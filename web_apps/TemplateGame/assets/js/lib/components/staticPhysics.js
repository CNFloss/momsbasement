"use strict";

define("components/staticPhysics", function(){

  const staticPhysics = (meta = {x:0, y:0, width:64, height:64}) => ({
    block : (movingObj) => {
      //console.log(meta.y + meta.height, movingObj.y, movingObj.blocked);
      movingObj.blocked = false;
      movingObj.onGround = false;
      // top left corner of incoming object (0,0)
      if (movingObj.x + movingObj.velocity_x > meta.x && movingObj.x + movingObj.velocity_x < meta.x + meta.width && movingObj.y + movingObj.velocity_y > meta.y && movingObj.y + movingObj.velocity_y < meta.y + meta.height) {
        if (movingObj.velocity_x !== 0 && movingObj.y - movingObj.velocity_y < meta.y + meta.height) {
          movingObj.x = meta.x + meta.width;
          movingObj.blocked = true;
        }
        if (movingObj.velocity_y !== 0 && movingObj.x - movingObj.velocity_x < meta.x + meta.width) {
          movingObj.y = meta.y + meta.height;
          movingObj.blocked = true;
        }
        return true
      }
      // top right corner of incoming object (width, 0)
      else if (movingObj.x + movingObj.width + movingObj.velocity_x > meta.x && movingObj.x + movingObj.width + movingObj.velocity_x < meta.x + meta.width && movingObj.y + movingObj.velocity_y > meta.y && movingObj.y + movingObj.velocity_y < meta.y + meta.height) {
        if (movingObj.velocity_x !== 0 && movingObj.y - movingObj.velocity_y < meta.y + meta.height) {
          movingObj.x = meta.x - movingObj.width;
          movingObj.blocked = true;
        }
        if (movingObj.velocity_y !== 0 && movingObj.x + movingObj.width - movingObj.velocity_x > meta.x) {
          movingObj.y = meta.y + meta.height;
          movingObj.blocked = true;
        }
        return true
      }
      // bottom left corner of incoming object (0, height)
      else if (movingObj.x + movingObj.velocity_x > meta.x && movingObj.x + movingObj.velocity_x < meta.x + meta.width && movingObj.y + movingObj.height + movingObj.velocity_y > meta.y && movingObj.y + movingObj.height + movingObj.velocity_y < meta.y + meta.height) {
        if (movingObj.velocity_y !== 0 && movingObj.x - movingObj.velocity_x < meta.x + meta.width) {
          movingObj.y = meta.y - movingObj.height;
          movingObj.blocked = true;
          movingObj.onGround = true;
        }
        // if this block comes first, 2 out of 10(minimum, has been more) times it will misfire and set the movingObj.x equal to meta.x + meta.width
        if (movingObj.velocity_x !== 0 && movingObj.y + movingObj.height - movingObj.velocity_y > meta.y) {
          movingObj.x = meta.x + meta.width;
          movingObj.blocked = true;
          movingObj.onGround = true;
        }
        return true
      }
      // bottom right corner of incoming object (width, height)
      else if (movingObj.x + movingObj.width + movingObj.velocity_x > meta.x && movingObj.x + movingObj.width + movingObj.velocity_x < meta.x + meta.width && movingObj.y + movingObj.height + movingObj.velocity_y > meta.y && movingObj.y + movingObj.height + movingObj.velocity_y < meta.y + meta.height) {
        if (movingObj.velocity_x !== 0 && movingObj.y + movingObj.height - movingObj.velocity_y > meta.y) {
          movingObj.x = meta.x - movingObj.width;
          movingObj.blocked = true;
          movingObj.onGround = true;
        }
        if (movingObj.velocity_y !== 0 && movingObj.x + movingObj.width - movingObj.velocity_x > meta.x) {
          movingObj.y = meta.y - movingObj.height;
          movingObj.blocked = true;
          movingObj.onGround = true;
        }
        return true
      }
      return false;
    }
  })

  return staticPhysics;

})
