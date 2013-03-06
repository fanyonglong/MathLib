// ### [Vector.prototype.toMathMLString()](http://mathlib.de/en/docs/vector/toMathMLString)
// Returns the (presentation) MathML representation of the vector.
//
// *@returns {string}*
toMathMLString() : string {
	return this.reduce(function (old, cur) {
		return old + '<mtr><mtd>' + MathLib.toMathMLString(cur) + '</mtd></mtr>';
	}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}