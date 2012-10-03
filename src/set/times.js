// ### Set.prototype.times()
// Multiplies all elements in the set if no argument is passed.
// Multiplies all elements by a argument if one is passed.
//
// *@param {number|MathLib object}*  
// *@returns {set}*
MathLib.extendPrototype('set', 'times', function (n) {
  if (!arguments.length) {
    return MathLib.times.apply(null, this);
  }
  else {
    return this.map(function (x) {
      return MathLib.times(x, n);
    });
  }
});