// ### Matrix.prototype.determinant()
// Calculates the determinant of the matrix via the LU decomposition.
// The result is cached.
//
// *@return {number|Complex}*
determinant() : any {
	var LU, determinant;

	if (this.isSquare()) {
		if (this.rank() < this.rows) {
			determinant = 0;
		}
		else {
			LU = this.LU();
			determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, LU.diag()));
		}

		this.determinant = function () {
			return determinant;
		};
		return determinant;
	}
}