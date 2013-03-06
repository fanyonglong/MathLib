// ### [Vector.prototype.reduce()](http://mathlib.de/en/docs/vector/reduce)
// Works like Array.prototype.reduce.
//
// *@returns {any}*
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, args);
}