// ### [Vector.prototype.times()](http://mathlib.de/en/docs/Vector/times)
// Multiplies the vector by a (complex) number or a matrix.
// The vector is multiplied from left to the matrix. 
// If you want to multiply it from the right use
// matrix.times(vector) instead of vector.times(matrix)
//
// *@param {number|Complex|Matrix}*  
// *@return {Vector}*
times(n : any) : any {
	var i, ii, colVectors,
			product = [];
	if (n.type === 'rational') {
		n = n.toNumber(); 
	}
	if (typeof n === 'number' || n.type === 'complex') {
		return this.map(function (x) {
			return MathLib.times(n, x);
		});
	}
	if (n.type === 'matrix') {
		colVectors = n.toColVectors();
		for (i = 0, ii = colVectors.length; i < ii; i++) {
			product[i] = this.scalarProduct(colVectors[i]);
		}
		return new MathLib.Vector(product);
	}
}