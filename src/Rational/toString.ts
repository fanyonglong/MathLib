// ### [Rational.prototype.toString()](http://mathlib.de/en/docs/rational/toString)
// Custom toString function
//
// *@return {string}*
toString() : String {
	return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
}