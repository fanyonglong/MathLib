// ### [Vector.prototype.toMathMLString()](http://mathlib.de/en/docs/Vector/toMathMLString)
// Returns the (presentation) MathML representation of the vector.
//
// *@return {string}*
toMathMLString() : string {
	return this.reduce(function (old, cur) {
		return old + '<mtr><mtd>' + MathLib.toMathMLString(cur) + '</mtd></mtr>';
	}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}