"use strict";

var Timer, rt;

rt = require("./runtime");

Timer = rt.type("Timer", ["stop"]);

exports.Timer = function () {
  return Timer;
};


// after(time : Number) do(action : Action) -> Timer
//
// Executes the action after the given time interval.
//
// Requesting stop on the timer object will stop the timer.
exports.after_do = rt.method("after() do()", [1, 1],
  function (timeInterval, block) {
    return timeInterval[0].asPrimitiveNumber().then(function (timeInterval) {
      var id, object;

      object = rt.object();

      id = setTimeout(function () {
        block[0].apply();
      }, timeInterval);

      object.stop = rt.method("stop", 0, function () {
        clearTimeout(id);
        return rt.done;
      });

      return object;
    });
  });

// every(time : Number) do(action : Action) -> Timer
//
// Executes the action every given time interval.
//
// Requesting stop on the timer object will stop the timer.
exports.every_do = rt.method("every() do()", [1, 1],
  function (timeInterval, block) {
    return timeInterval[0].asPrimitiveNumber().then(function (timeInterval){
      var id, object;

      object = rt.object();

      id = setInterval(function () {
        block[0].apply();
      }, timeInterval);

      object.stop = rt.method("stop", 0, function () {
        clearInterval(id);
        return rt.done;
      });

      return object;
    })
  });

