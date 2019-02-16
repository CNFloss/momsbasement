define("components/rayCast", function(){

  const rayCast = (meta = {x:0, y:0, width:64, height:64}) => ({
    castHorizontalRay : (ctx, dir, rayCount = 4, rayLength = meta.width) => {
      let rayCastArray;
      //calculate ray spacing
      let raySpacing = meta.height/ (rayCount - 1);
      //calculate origin of horizontal rays
      let originX = dir.x > 0 ? meta.x + meta.width: meta.x;
      //draw horizontal lines
      if (dir.x !== 0) {
        // create returned array of rays
        rayCastArray = [];
        for (let i = 0; i < rayCount; i++) {
          rayCastArray.push({x1:0, y1:0, x2:0, y2:0});
        }
        // cast rays based on direction
        if (dir.y > 0) {
          for (let i = 0; i < rayCount; i++) {
            ctx.beginPath();
            // origin of "ray shot"
            ctx.moveTo(originX, meta.y + (i * raySpacing));
            // destination of "ray shot"
            ctx.lineTo(originX + (rayLength*Math.round(dir.x)), meta.y + (i * raySpacing));
            ctx.stroke();
            //console.log("line #: "+i);
            // assign the coordinate values of each ray
            rayCastArray[i].x1 = originX;
            rayCastArray[i].x2 = originX + (rayLength*Math.round(dir.x));
            rayCastArray[i].y1 = meta.y + (i * raySpacing);
            rayCastArray[i].y2 = meta.y + (i * raySpacing);
          }
        } else {
          for (let i = rayCount -1; i > -1; i--) {
            ctx.beginPath();
            // origin of "ray shot"
            ctx.moveTo(originX, meta.y + (i * raySpacing));
            // destination of "ray shot"
            ctx.lineTo(originX + (rayLength*Math.round(dir.x)), meta.y + (i * raySpacing));
            ctx.stroke();
            // assign the coordinate values of each ray
            rayCastArray[i].x1 = originX;
            rayCastArray[i].x2 = originX + (rayLength*Math.round(dir.x));
            rayCastArray[i].y1 = meta.y + (i * raySpacing);
            rayCastArray[i].y2 = meta.y + (i * raySpacing);
          }
        }
        //console.log(rayCastArray);
      }
      return rayCastArray;
    },
    castVerticalRay : (ctx, dir, rayCount = 4, rayLength = meta.height) => {
      let rayCastArray;
      //calculate ray spacing
      let raySpacing = meta.width/ (rayCount - 1);
      //calculate origin of vertical rays
      let originY = dir.y > 0 ? meta.y + meta.height: meta.y;
      //draw vertical lines
      if (dir.y !== 0) {
        // create returned array of rays
        rayCastArray = [];
        for (let i = 0; i < rayCount; i++) {
          rayCastArray.push({x1:0, y1:0, x2:0, y2:0});
        }
        // cast rays based on direction
        if (dir.x <= 0) {

          // draw from left to right if direction.x is heading left
          for (let i = 0; i < rayCount; i++) {
            ctx.beginPath();
            // origin of "ray shot"
            ctx.moveTo(meta.x + (i * raySpacing), originY);
            // destination of "ray shot"
            ctx.lineTo(meta.x + (i * raySpacing), originY + (rayLength*Math.round(dir.y)));
            ctx.stroke();
            // assign the coordinate values of each ray
            rayCastArray[i].x1 = meta.x + (i * raySpacing);
            rayCastArray[i].x2 = meta.x + (i * raySpacing);
            rayCastArray[i].y1 = originY;
            rayCastArray[i].y2 = originY + (rayLength*Math.round(dir.y));
          }
        } else {
          // draw from right to left if direction.x is heading right
          for (let i = rayCount -1; i > -1; i--) {
            ctx.beginPath();
            // origin of "ray shot"
            ctx.moveTo(meta.x + (i * raySpacing), originY);
            // destination of "ray shot"
            ctx.lineTo(meta.x + (i * raySpacing), originY + (rayLength*Math.round(dir.y)));
            ctx.stroke();
            // assign the coordinate values of each ray
            rayCastArray[i].x1 = meta.x + (i * raySpacing);
            rayCastArray[i].x2 = meta.x + (i * raySpacing);
            rayCastArray[i].y1 = originY;
            rayCastArray[i].y2 = originY + (rayLength*Math.round(dir.y));
          }
        }
        //console.log(rayCastArray);
      }
      return rayCastArray;
    }
  })

  return rayCast;

})
