// ### Set.prototype.toLaTeX()
// Returns the LaTeX representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toLaTeX', function () {
  if (this.isEmpty()) {
    return '\\emptyset';
  }
  else {
    return this.reduce(function(old, cur) {
      return old + MathLib.toLaTeX(cur) + ', ';
    }, '\\{').slice(0, -2) + '\\}';
  }
});