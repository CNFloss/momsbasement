define("line", function(){

  const line = (line={x1:0, y1:0, x2:0, y2:0}) => {
    let temp = {
    segment: line,
    display: (ctx) => {  
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(line.x1, line.y1, 10, 0, Math.PI * 2, false);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(line.x2, line.y2, 10, 0, Math.PI * 2, false);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
      },
      update1: (x, y) => {
        temp.segment.x1 = x;
        temp.segment.y1 = y;
      },
      update2: (x, y) => {
        temp.segment.x2 = x;
        temp.segment.y2 = y;
      }
    }
    return temp;
  }

  return line;

})