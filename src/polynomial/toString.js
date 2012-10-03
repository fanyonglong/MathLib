// ### Polynomial.prototype.toString()
// Custom toString function
//
// *@returns {string}*
MathLib.extendPrototype('polynomial', 'toString', function (opt) {
  var str = MathLib.toString(this[this.deg]) + '*x^' + this.deg,
      i;
  for (i=this.deg-1; i>=0; i--) {
    if (!MathLib.isZero(this[i])) {

      str += MathLib.toString(this[i], true);

      if (i > 1) {
        str += '*x^' + MathLib.toString(i);
      }
      else if (i === 1) {
        str += '*x';
      }
    }
  }
  return str;
});