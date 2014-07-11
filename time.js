"use strict";

var prim, rt, type, util;

rt = require("./runtime");
prim = require("./runtime/primitives");
util = require("./util");

type = rt.type("Date", ["asString", "seconds", "hour", "minutes", "month", "year"]);

exports.Date = type;

function DateTime(date) {
  prim.GraceObject.call(this);

  this.object.date = date;
}

util.inherits(DateTime, prim.GraceObject);

//asString -> String
//Returns a String representation of the date
DateTime.prototype.asString = rt.method("asString", 0, function () {
  return rt.string(this.object.date.toDateString());
});

//seconds -> Number
//Returns a numerical representation of the seconds of the Date object
DateTime.prototype.seconds = rt.method("seconds", 0, function() {
  return rt.number(this.object.date.getSeconds());
});

//hour -> Number
//Returns a numerical representation of the hour of the Date object
DateTime.prototype.hour = rt.method("hour", 0, function(){
  return rt.number(this.object.date.getHours());
});

//minutes -> Number
//Returns a numerical representation of the minutes of the Date object
DateTime.prototype.minutes = rt.method("minutes", 0, function(){
  return rt.number(this.object.date.getMinutes());
});

//month -> Number
//Returns a numerical representation of the month of the Date object
DateTime.prototype.month = rt.method("month", 0, function(){
  return rt.number(this.object.date.getMonth());
});

//year -> Number
//Returns a numerical representation of the year of the Date object
DateTime.prototype.year = rt.method("year", 0, function(){
  return rt.number(this.object.date.getFullYear());
});

//day -> Number
//Returns a numerical representation of the day of the Date object
DateTime.prototype.day = rt.method("day", 0, function(){
  return rt.number(this.object.date.getDay());
});

//milliseconds -> Number
//Returns a numerical representation of the number of milliseconds passed
//since 1st Jan 1970 and the time in the Date object
DateTime.prototype.milliseconds = rt.method("milliseconds", 0, function(){
  return rt.number(this.object.date.getTime());
});

//this-Date -> Number
//Returns the difference in milliseconds between this Date object and the given
//Date object
DateTime.prototype["-"] = rt.method("-", 1, function(date){
  var self = this;
  return type.assert(date).then(function () {
    return self.milliseconds().then(function(milli1){
      return milli1.asPrimitiveNumber();
    }).then(function (milli1) {
      return date.milliseconds().then(function(milli2){
        return rt.Number.assert(milli2).then(function(){
          return milli2.asPrimitiveNumber();
        });
      }).then(function(milli2) {
        return rt.number(milli1-milli2);
      });
    });
  });
});

//this==Date -> Boolean
//Returns whether this Date and the other Date is the same
DateTime.prototype["=="] = rt.method("==", 1, function(date){
  var self = this;

  return type.assert(date).then(function(){
    return self.milliseconds().then(function(milli1){
      return milli1.asPrimitiveNumber();
    }).then(function(milli1){
      return date.milliseconds().then(function(milli2){
        return rt.Number.assert(milli2).then(function(){
          return milli2.asPrimitiveNumber();
        });
      }).then(function(milli2){
        return rt.bool(milli1==milli2);
      });
    });
  });
});


//time.now -> Date
//
//an object that represents a snapshot of the the current calendar date
exports.now = rt.method("now", 0, function(){
  return new DateTime(new Date());
});
