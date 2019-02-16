define("clock", function() {

  const clock = function() {
    let temp = {
      milliseconds: 0.0,
      seconds: 0.0,
      current: 0.0,
      last: 0.0,
      delta: 0.16,
      fps: 0,
      frameCount: 0,
      update: function(t) {
        temp.frameCount = temp.frameCount + 1;
        temp.seconds = t/1000;
        temp.current = t/1000;
        temp.delta = temp.current - temp.last;
        temp.last = temp.current;
        temp.fps = 1/temp.delta;
      }
    };
    return temp;
  };

  return clock;

});