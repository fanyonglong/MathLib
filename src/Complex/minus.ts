// ### Complex.prototype.minus()
// Calculates the difference of two complex numbers
//
// *@param {number|Complex}* The subtrahend  
// *@return {Complex}*
minus(c) : Complex {
	return this.plus(MathLib.negative(c));
}