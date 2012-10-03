// ### Matrix.prototype.isDiag()
// Determines if the matrix is a diagonal matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isDiag', function () {
  var i, j, ii, jj;
  if ((this.hasOwnProperty('isUpper') && this.isUpper()) + (+(this.hasOwnProperty('isLower') && this.isLower())) + (+(this.hasOwnProperty('isLower') && this.isLower())) > 1) {
    return true;
  }
  for (i = 0, ii = this.rows; i < ii; i++) {
    for (j = 0, jj = this.cols; j < jj; j++) {
      if (i !== j && this[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
});