define("components/physicsUpdate", function(){

  const physicsUpdate = (meta = {x:0, y:0, width:64, height:64}) => ({
    // can only detect collisons at furthest cast point this needs to test if a line collides with a box
    receiveRayData : (obj) => {
      //console.log(obj);

      if (obj.h !== undefined && obj.h.length !== 0 && !meta.blocked) {
        //console.log(obj.h[0].direction, meta.velocity_x, obj.h[0].rayDist);
        //console.log(obj.h[0].direction);
        /*for (let i = 0; i < obj.h.length; i++) {
          //console.log(obj.h[i].direction, obj.h[i].rayNum, obj.h[i].rayDist);
        }*/
        if (obj.h[0].direction.x > 0 && meta.velocity_x + (meta.x + meta.width) > obj.h[0].x) {
          meta.x = obj.h[0].x - meta.width;
          meta.velocity_x = 0;
          meta.blocked = true;
        }
        else if (obj.h[0].direction.x < 0 && meta.velocity_x + meta.x < obj.h[0].x) {
          meta.x = obj.h[0].x;
          meta.velocity_x = 0;
          meta.blocked = true;
        }
      } else {
        meta.blocked = false;
      }

      if (obj.v !== undefined && obj.v.length !== 0 && !meta.blocked) {
        console.log(obj.v[0].direction, meta.velocity_y, obj.v[0].rayDist, obj.v[0].y);
        /*for (let i = 0; i < obj.v.length; i++) {
          console.log(obj.v[i].direction, obj.v[i].rayNum, obj.v[i].rayDist);
        }*/
        if (obj.v[0].direction.y > 0 && meta.velocity_y + (meta.y + meta.height) > obj.v[0].y) {
          meta.y = obj.v[0].y - meta.height;
          meta.velocity_y = 0;
          meta.blocked = true;
        }
        else if (obj.v[0].direction.y < 0 && meta.velocity_y + meta.y < obj.v[0].y) {
          //meta.y = obj.v[0].y;
          meta.velocity_y = 0;
          meta.blocked = true;
        }
      } else {
        meta.blocked = false;
      }
      
    }
  });

  return physicsUpdate;

})
