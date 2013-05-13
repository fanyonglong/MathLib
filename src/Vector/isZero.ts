// ### [Vector.prototype.isZero()](http://mathlib.de/en/docs/Vector/isZero)
// Determines if the vector is the zero vector.
//
// *@return {boolean}*
isZero() : bool {
	return this.every(MathLib.isZero);
}