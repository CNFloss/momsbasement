define("components/move", function(){

  const move = (meta = {x:0, y:0, width:64, height:64}) => ({

    jump : (jForce) => {
      if (meta.onGround && !meta.jumping) {
        meta.jumping = true;
        meta.onGround = false;
        meta.velocity_y = 0;
        meta.velocity_y -= 1 * jForce;
      }
    },
    platformerMove : (rect = {x:0, y:0}, maxSpeed, gravity, d, ctx) => {
      if (meta.y > 500) {
        console.log("game break");
      }
      if (meta.y > 404) {
        console.log("player.x:" + meta.x, "player.y:" + meta.y, "player.onGround:" + meta.onGround, "player.blocked:" + meta.blocked);
      }
      if (!meta.onGround) {
        meta.jumping = false;
        rect.y = 1;
        meta.velocity_y += (rect.y) * (gravity * d);
      }
      else if (meta.onGround) {
        meta.jumping = false;
        rect.y = 0;
        //meta.velocity_y = 0;
      }
      if (rect.x !== 0 && rect.y !== 0 && !meta.blocked) {
        rect.x = rect.x * 0.707;
        rect.y = rect.y * 0.707;
      }
      meta.velocity_x = (rect.x) * (maxSpeed * d);
      meta.x += meta.velocity_x;
      meta.y += meta.velocity_y;
      //return true;
    },
    topDownMove : (rect = {x:0, y:0}, maxSpeed, d) => {
      let temp = {x:0, y:0}
      if (rect.x !== 0 && rect.y !== 0 && !meta.blocked) {
        temp.x = rect.x * 0.707;
        temp.y = rect.y * 0.707;
      }
      meta.velocity_x = (rect.x) * (maxSpeed * d);
      meta.velocity_y = (rect.y) * (maxSpeed * d);
      meta.x += meta.velocity_x;
      meta.y += meta.velocity_y;
    },
    gridMove : (direction = {x:0, y:0}, speed, d) => {
      if ((direction.x !== 0 || direction.y !== 0) && (meta.predictX === meta.x && meta.predictY === meta.y)) {
        meta.originX = meta.x;
        meta.originY = meta.y;
        meta.lastDir = direction;
        meta.predictX = meta.x + (meta.width * direction.x);
        meta.predictY = meta.y + (meta.height * direction.y);
      }
      else if (meta.predictX !== meta.x || meta.predictY !== meta.y) {
        meta.velocity_y = meta.lastDir.y * speed * d;
        meta.velocity_x = meta.lastDir.x * speed * d;
        if (0 > meta.lastDir.y || 0 >  meta.lastDir.x) {
          if (meta.y + meta.velocity_y <= meta.predictY) {
            meta.y = meta.predictY;
            meta.velocity_y = 0;
            meta.originY = meta.y;
          }
          if (meta.x + meta.velocity_x <= meta.predictX) {
            meta.x = meta.predictX;
            meta.velocity_x = 0;
            meta.originX = meta.x;
          }
        }
        else if (0 < meta.lastDir.y || 0 <  meta.lastDir.x) {
          if (meta.y + meta.velocity_y >= meta.predictY) {
            meta.y = meta.predictY;
            meta.velocity_y = 0;
            meta.originY = meta.y;
          }
          if (meta.x + meta.velocity_x >= meta.predictX) {
            meta.x = meta.predictX;
            meta.velocity_x = 0;
            meta.originX = meta.x;
          }
        }
        meta.y += meta.velocity_y;
        meta.x += meta.velocity_x;
      }
    },
    moveToPoint : (point = {x:0, y:0}, moves, speed, d) => {
      /*
        This is a good move to point function with a bad counter you need to either take it out or get a more accurate counter
      */
      if ((point.x !== meta.predictX || point.y !== meta.predictY) || meta.counter > moves) {
        meta.originX = meta.x;
        meta.originY = meta.y;
        meta.predictX = point.x;
        meta.predictY = point.y;
        meta.lastDir = {x:Math.abs(point.x - meta.x)/(point.x - meta.x),y:Math.abs(point.y - meta.y)/(point.y - meta.y)};
        meta.counter = 0;
      }
      else if ((meta.predictX !== meta.x || meta.predictY !== meta.y) && meta.counter < moves) {
        if (Math.round(Math.abs(meta.x - meta.originX)/64) > meta.counter) {
          meta.counter += 1
          console.log(Math.round(Math.abs(meta.x - meta.originX)/64), meta.counter);
        }
        meta.velocity_y = meta.lastDir.y * speed * d;
        meta.velocity_x = meta.lastDir.x * speed * d;

        if (0 > meta.lastDir.y) {
          if (meta.y + meta.velocity_y < meta.predictY) {
            meta.lastDir.y = 0;
            meta.y = meta.predictY;
            meta.velocity_y = 0;
            meta.originY = meta.y;
          }
        }
        if (0 < meta.lastDir.y) {
          if (meta.y + meta.velocity_y > meta.predictY) {
            meta.lastDir.y = 0;
            meta.y = meta.predictY;
            meta.velocity_y = 0;
            meta.originY = meta.y;
          }
        }
        if (0 >  meta.lastDir.x) {
          if (meta.x + meta.velocity_x < meta.predictX) {
            meta.lastDir.x = 0;
            meta.x = meta.predictX;
            meta.velocity_x = 0;
            meta.originX = meta.x;
          }
        }
        if  (0 <  meta.lastDir.x) {
          if (meta.x + meta.velocity_x > meta.predictX) {
            meta.lastDir.x = 0;
            meta.x = meta.predictX;
            meta.velocity_x = 0;
            meta.originX = meta.x;
          }
        }
        //console.log(Math.floor(Math.round(meta.x)/64), Math.floor(Math.round(meta.y)/64)%2);
        if (!isNaN(meta.velocity_y) && meta.velocity_y !== 0) {
          meta.y += meta.velocity_y;
        }
        else if (!isNaN(meta.velocity_x)) {
          meta.x += meta.velocity_x;
        }
      }
    }

  })

  return move;

})
