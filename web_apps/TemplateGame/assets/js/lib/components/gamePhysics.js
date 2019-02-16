define("components/gamePhysics", function(){

  const gamePhysics = (locals) => ({

    calculateRayPhysics : (rays, dir) => {
      let temp = {h:undefined, v:undefined};
      if (rays.horizontal !== undefined) {
        temp.h = [];
        // loop through rays then obstacles
        for (let j = 0; j < rays.horizontal.length; j++) {
          for (let i = 0; i < locals.obstacles.length; i++) {
            if (dir.x > 0) {

              let line1 = {x1:rays.horizontal[j].x1, y1:rays.horizontal[j].y1, x2:rays.horizontal[j].x2, y2:rays.horizontal[j].y2}
              let line2 = {x1:locals.obstacles[i].x, y1:locals.obstacles[i].y, x2:locals.obstacles[i].x, y2:locals.obstacles[i].y + locals.obstacles[i].height}

              let A1 = line1.y2 - line1.y1,
              B1 = line1.x1 - line1.x2,
              C1 = A1 * line1.x1 + B1 * line1.y1,
              A2 = line2.y2 - line2.y1,
              B2 = line2.x1 - line2.x2,
              C2 = A2 * line2.x1 + B2 * line2.y1,
              denominator = A1 * B2 - A2 * B1;
        
              let intersect = {
                x: (B2 * C1 - B1 * C2)/denominator,
                y: (A1 * C2 - A2 * C1)/denominator
              }
              let rx0 = (intersect.x - line1.x1) / (line1.x2 - line1.x1);
              let ry0 = (intersect.y - line1.y1) / (line1.y2 - line1.y1); 
              let rx1 = (intersect.x - line2.x1) / (line2.x2 - line2.x1);
              let ry1 = (intersect.y - line2.y1) / (line2.y2 - line2.y1);

              if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                temp.h.push({direction: dir, rayNum: j, rayDist: intersect.x - rays.horizontal[j].x1, x: intersect.x})
              }
              else if (intersect.x >= line2.x1 && intersect.x <= line2.x2 && intersect.y >= line2.y1 && intersect.y <= line2.y2
                && intersect.x >= line1.x1 && intersect.x <= line1.x2 && intersect.y >= line1.y1 && intersect.y <= line1.y2) {
                temp.h.push({direction: dir, rayNum: j, rayDist: intersect.x - rays.horizontal[j].x1, x: intersect.x})
              }

              if (denominator === 0) {
                if (line1.x1 === line2.x1 && line1.y1 === line2.y1) {
                  return undefined;
                }
                return undefined;
              }

            } else {

              let line1 = {x1:rays.horizontal[j].x1, y1:rays.horizontal[j].y1, x2:rays.horizontal[j].x2, y2:rays.horizontal[j].y2}
              let line2 = {x1:locals.obstacles[i].x + locals.obstacles[i].width, y1:locals.obstacles[i].y, x2:locals.obstacles[i].x + locals.obstacles[i].width, y2:locals.obstacles[i].y + locals.obstacles[i].height}

              let A1 = line1.y2 - line1.y1,
              B1 = line1.x1 - line1.x2,
              C1 = A1 * line1.x1 + B1 * line1.y1,
              A2 = line2.y2 - line2.y1,
              B2 = line2.x1 - line2.x2,
              C2 = A2 * line2.x1 + B2 * line2.y1,
              denominator = A1 * B2 - A2 * B1;
        
              let intersect = {
                x: (B2 * C1 - B1 * C2)/denominator,
                y: (A1 * C2 - A2 * C1)/denominator
              }
              let rx0 = (intersect.x - line1.x1) / (line1.x2 - line1.x1);
              let ry0 = (intersect.y - line1.y1) / (line1.y2 - line1.y1); 
              let rx1 = (intersect.x - line2.x1) / (line2.x2 - line2.x1);
              let ry1 = (intersect.y - line2.y1) / (line2.y2 - line2.y1);

              if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                console.log(intersect);
                temp.h.push({direction: dir, rayNum: j, rayDist: intersect.y - rays.horizontal[j].y1, y: intersect.y})
              }
              else if (intersect.x >= line2.x1 && intersect.x <= line2.x2 && intersect.y >= line2.y1 && intersect.y <= line2.y2
                && intersect.x >= line1.x1 && intersect.x <= line1.x2 && intersect.y >= line1.y1 && intersect.y <= line1.y2) {
                temp.h.push({direction: dir, rayNum: j, rayDist: intersect.x - rays.horizontal[j].x1, x: intersect.x})
              }

              if (denominator === 0) {
                if (line1.x1 === line2.x1 && line1.y1 === line2.y1) {
                  return undefined;
                }
                return undefined;
              }

            }
          }
        }
      }
      if (rays.vertical !== undefined) {
        temp.v = [];
        // loop through rays then obstacles
        for (let j = 0; j < rays.vertical.length; j++) {
          for (let i = 0; i < locals.obstacles.length; i++) {

            if (dir.y > 0) {

              let line1 = {x1:rays.vertical[j].x1, y1:rays.vertical[j].y1, x2:rays.vertical[j].x2, y2:rays.vertical[j].y2}
              let line2 = {x1:locals.obstacles[i].x, y1:locals.obstacles[i].y, x2:locals.obstacles[i].x + locals.obstacles[i].width, y2:locals.obstacles[i].y}
              //console.log(line1, line2);

              let A1 = line1.y2 - line1.y1,
              B1 = line1.x1 - line1.x2,
              C1 = A1 * line1.x1 + B1 * line1.y1,
              A2 = line2.y2 - line2.y1,
              B2 = line2.x1 - line2.x2,
              C2 = A2 * line2.x1 + B2 * line2.y1,
              denominator = A1 * B2 - A2 * B1;

              if (denominator === 0) {
                if (line1.x1 === line2.x1 && line1.y1 === line2.y1) {
                  return undefined;
                }
                return undefined;
              }
        
              let intersect = {
                x: (B2 * C1 - B1 * C2)/denominator,
                y: (A1 * C2 - A2 * C1)/denominator
              }
              let rx0 = (intersect.x - line1.x1) / (line1.x2 - line1.x1);
              let ry0 = (intersect.y - line1.y1) / (line1.y2 - line1.y1); 
              let rx1 = (intersect.x - line2.x1) / (line2.x2 - line2.x1);
              let ry1 = (intersect.y - line2.y1) / (line2.y2 - line2.y1);

              if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                console.log(intersect);
                temp.v.push({direction: dir, rayNum: j, rayDist: intersect.y - rays.vertical[j].y1, y: intersect.y})
              }
              else if (intersect.x >= line2.x1 && intersect.x <= line2.x2 && intersect.y >= line2.y1 && intersect.y <= line2.y2
                && intersect.x >= line1.x1 && intersect.x <= line1.x2 && intersect.y >= line1.y1 && intersect.y <= line1.y2) {
                temp.v.push({direction: dir, rayNum: j, rayDist: intersect.y - rays.vertical[j].y1, y: intersect.y})
              }

            } else {

              let line1 = {x1:rays.vertical[j].x1, y1:rays.vertical[j].y1, x2:rays.vertical[j].x2, y2:rays.vertical[j].y2}
              let line2 = {x1:locals.obstacles[i].x, y1:locals.obstacles[i].y + locals.obstacles[i].height, x2:locals.obstacles[i].x + locals.obstacles[i].width, y2:locals.obstacles[i].y + locals.obstacles[i].height}

              let A1 = line1.y2 - line1.y1,
              B1 = line1.x1 - line1.x2,
              C1 = A1 * line1.x1 + B1 * line1.y1,
              A2 = line2.y2 - line2.y1,
              B2 = line2.x1 - line2.x2,
              C2 = A2 * line2.x1 + B2 * line2.y1,
              denominator = A1 * B2 - A2 * B1;

              if (denominator === 0) {
                if (line1.x1 === line2.x1 && line1.y1 === line2.y1) {
                  return undefined;
                }
                return undefined;
              }
        
              let intersect = {
                x: (B2 * C1 - B1 * C2)/denominator,
                y: (A1 * C2 - A2 * C1)/denominator
              }
              let rx0 = (intersect.x - line1.x1) / (line1.x2 - line1.x1);
              let ry0 = (intersect.y - line1.y1) / (line1.y2 - line1.y1); 
              let rx1 = (intersect.x - line2.x1) / (line2.x2 - line2.x1);
              let ry1 = (intersect.y - line2.y1) / (line2.y2 - line2.y1);

              /*if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && ((rx1 >= 0 && rx0 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                temp.v.push({direction: dir, rayNum: j, rayDist: intersect.y - rays.vertical[j].y1, y: intersect.y})
              }*/

              if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
                //console.log(intersect);
                temp.v.push({direction: dir, rayNum: j, rayDist: intersect.y - rays.vertical[j].y1, y: intersect.y})
              }
              else if (intersect.x >= line2.x1 && intersect.x <= line2.x2 && intersect.y >= line2.y1 && intersect.y <= line2.y2
                && intersect.x >= line1.x1 && intersect.x <= line1.x2 && intersect.y >= line1.y1 && intersect.y <= line1.y2) {
                temp.v.push({direction: dir, rayNum: j, rayDist: intersect.y - rays.vertical[j].y1, y: intersect.y})
              }

            }
          }
        }
      }
      return temp;
    },

    calculateAABBPhysics : () => {
      return;
    }

  })

  return gamePhysics;

})
