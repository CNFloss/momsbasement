define("canvasApplication", function(){

  const CANVAS_APPLICATION = function({canvasElementId, renderDimension} = {canvasElementId: "myCanvas", renderDimension: "2d"}) {

    let canvasElement = document.getElementById(canvasElementId);

    const returnedObject = {
      stage: canvasElement,
      ctx: canvasElement.getContext(renderDimension),
      rect: canvasElement.getBoundingClientRect()
    };

    return Object.freeze(returnedObject);

  };

  return CANVAS_APPLICATION;

});