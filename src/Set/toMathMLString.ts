// ### Set.prototype.toMathMLString()
// Returns the (presentation) MathML representation of the set
//
// *@return {string}*
toMathMLString() : string {
	if (this.isEmpty()) {
		return '<mi>&#x2205;</mi>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toMathMLString(cur) + '<mo>,</mo>';
		}, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
	}
}