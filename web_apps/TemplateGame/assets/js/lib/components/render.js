define("components/render", function(){

  const render = (meta = {x:0, y:0, width:64, height:64, color:"black"}) => ({
    //locals : {image:null},
    init : () =>  {
      if (meta.filename !== undefined && meta.filename !== null && meta.filename !== "") {
        meta.image = new Image();
        meta.image.onload = () => {console.log("loaded", meta.image.src);};
        meta.image.src = meta.filename;
      }
    },
    display : (ctx) => {
      ctx.fillStyle = meta.color;
      ctx.beginPath();
      ctx.fillRect(meta.x, meta.y, meta.width, meta.height);
    },
    draw : (ctx) => {
      ctx.drawImage(meta.image, 0, 0, meta.width, meta.height, meta.x, meta.y, meta.width, meta.height);
    }
  })

  return render;

})
