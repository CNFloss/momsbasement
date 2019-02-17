"use strict";

//By default load any module IDs from js/lib

requirejs.config({ baseUrl: "TemplateGame/assets/js/lib" });

// Load all Modules.
requirejs([

  "sprite",
  "gameWorld",
  "line",
  "segmentIntersect",
  "clock",
  "canvasApplication"

// Start "root" or "main" module/ script. 
], function(sprite, gameWorld, line, segmentIntersect, clock, canvasApplication) {

  (function() {
    "use strict";
    // PLAYER INPUT VARIABLES AND METHODS.

    // PLAYER 1 KEYS
    let keyW = false;
    let keyA = false;
    let keyS = false;
    let keyD = false;

    // MOUSE CONTROL VARIABLES
    let mouseCoords = {x:0, y:0};
    let canPick = true;
    let grabbedPoint = null;

    // EVENT LISTENERS
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
    window.addEventListener("mousedown", selectPoint);
    window.addEventListener("mousemove", movePoint);

    function selectPoint(event) {
      return event;
    }

    function movePoint(event) {
      return event;
    }

    function onKeyDown(event) {
      let keyCode = event.keyCode;
      switch (keyCode) {
        case 68:
          // D
          keyD = true;
          break;
        case 83:
          // S
          keyS = true;
          break;
        case 65:
          // A
          keyA = true;
          break;
        case 87:
          // W
          keyW = true;
          break;
      }
    }

    function onKeyUp(event) {
      let keyCode = event.keyCode;
      switch (keyCode) {
        case 68:
          // D key
          keyD = false;
          break;
        case 83:
          // S key
          keyS = false;
          break;
        case 65:
          // A key
          keyA = false;
          break;
        case 87:
          // W key
          keyW = false;
          break;
      }
    }

    // stuff for accurate button pressing
    // final direction vector
    let direction = {x:0, y:0};
    // specific direction vectors for accurate key presses
    let RXInput = 0;
    let LXInput = 0;
    let UYInput = 0;
    let DYInput = 0;

    // BASIC APP VARIABLES AND METHODS.

    const CANVAS_OBJECT = canvasApplication({canvasElementId: "myCanvas", renderDimension: "2d"});

    let rAF;

    const gameClock = clock();

    // GAME VARIABLES AND METHODS.

    const PIXELS_TO_METERS = function(px) {
      return px / 32;
    };

    const METERS_TO_PIXELS = function(meters) {
      return Math.floor(meters * 32);
    };

    const BASIC_TILE_SIZE = Object.freeze({
      PX: 32,
      METERS: 1
    });

    // APP AND GAME LOOP.

    function Mainloop(t) {
      gameClock.update(t);
      CANVAS_OBJECT.ctx.clearRect(0, 0, CANVAS_OBJECT.rect.width, CANVAS_OBJECT.rect.height);

      // Reset Inputs.
      direction = {x:0, y:0};

      // Key Events.
      // Player One keys.

      if (keyD) {
        RXInput = 1;
      }
      else {
        RXInput = 0;
      }
      if (keyS) {
        DYInput = 1;
      }
      else {
        DYInput = 0;
      }
      if (keyA) {
        LXInput = -1;
      }
      else {
        LXInput = 0;
      }
      if (keyW) {
        UYInput = -1;
      }
      else {
        UYInput = 0;
      }

      direction.x = RXInput + LXInput;
      direction.y = UYInput + DYInput;

      // Update physics / states based on input.



      // Render to canvas.



      // Nothing after this next line will be executed
      rAF = window.requestAnimationFrame(Mainloop);

    }

    function main() {
      window.requestAnimationFrame(Mainloop);
    }

    window.addEventListener("load", main);

  })();

});
