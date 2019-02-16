define("segmentIntersect", function(){

  const segmentIntersect = (line1, line2) => {
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

    if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && 
        ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
        return intersect;
    }

      //console.log(denominator, intersect);

        /*else if (intersect.x >= line2.x1 && intersect.x <= line2.x2 && intersect.y >= line2.y1 && intersect.y <= line2.y2
          && intersect.x >= line1.x1 && intersect.x <= line1.x2 && intersect.y >= line1.y1 && intersect.y <= line1.y2) {
          return intersect;
        }*/


    if (denominator === 0) {
      if (line1.x1 === line2.x1 && line1.y1 === line2.y1) {
        console.log("parallel");
        return "parallel";
      }
        return false;
      }
    }

  return segmentIntersect;

})