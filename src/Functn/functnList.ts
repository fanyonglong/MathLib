var mathStart = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><',
		mathEnd   = '/><ci>x</ci></apply></lambda></math>';


// ## unary functions
// Some functions for the functn prototype
var unaryFunctions = {
	abs: Math.abs,
	arccos: Math.acos,
	arccot: function (x) {
		return 1.5707963267948966 - Math.atan(x);
	},
	arccsc: function (x) {
		return Math.asin(1 / x);
	},
	arcosh: (<any>Math).acosh || function (x) {
		return Math.log(x + Math.sqrt(x * x - 1));
	},
	arcoth: function (x) {
		// Handle ±∞
		if (!MathLib.isFinite(x)) {
			return 1 / x;
		}
		return 0.5 * Math.log((x + 1) / (x - 1));
	},
	arcsch: function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return 1 / x;
		}
		return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1));
	},
	arcsec: function (x) {
		return Math.acos(1 / x);
	},
	arcsin: Math.asin,
	arctan: Math.atan,
	arsech: function (x) {
		return Math.log((1 + Math.sqrt(1 - x * x)) / x);
	},
	arsinh: (<any>Math).asinh || function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return x;
		}
		return Math.log(x + Math.sqrt(x * x + 1));
	},
	artanh: (<any>Math).atanh || function (x) {
		// Handle ±0
		if (x === 0) {
			return x;
		}
		return 0.5 * Math.log((1 + x) / (1 - x));
	},
	ceil: function (x) {
		// Some implementations have a bug where Math.ceil(-0) = +0 (instead of -0)
		if (x === 0) {
			return x;
		}
		return Math.ceil(x);
	},
	floor: Math.floor,
	cos: Math.cos,
	cosh: (<any>Math).cosh || function (x) {
		return (Math.exp(x) + Math.exp(-x)) / 2;
	},
	cot: function (x) {
		// Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
		if (x === 0) {
			return 1 / x;
		}
		// cot(x) = tan(pi/2 - x) is better than 1/tan(x)
		return Math.tan(1.5707963267948966 - x);
	},
	coth: function (x) {
		// Handle ±0
		if (x === 0) {
			return 1 / x;
		}

		// Handle ±∞
		if (!MathLib.isFinite(x)) {
			return MathLib.sign(x);
		}

		return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
	},
	csc: function (x) {
		return 1 / Math.sin(x);
	},
	csch: function (x) {
		// csch(-0) should be -∞ not ∞
		if (x === 0) {
			return 1 / x;
		}
		return 2 / (Math.exp(x) - Math.exp(-x));
	},
	exp: function (x) {
		return Math.exp(x);
	},
	inverse: function (x) {
		return 1 / x;
	},
	sec: function (x) {
		return 1 / Math.cos(x);
	},
	sech: function (x) {
		return 2 / (Math.exp(x) + Math.exp(-x));
	},
	sin: Math.sin,
	sinh: (<any>Math).sinh || function (x) {
		// sinh(-0) should be -0
		if (x === 0) {
			return x;
		}
		return (Math.exp(x) - Math.exp(-x)) / 2;
	},
	tan: Math.tan,
	tanh: (<any>Math).tanh || function (x) {
		var n, p;

		// Handle ±0 and ±∞ separately
		// Their values happen to coincide with sign
		if (x === 0 || !MathLib.isFinite(x)) {
			return MathLib.sign(x);
		}

		p = Math.exp(x);
		return (p * p - 1) / (p * p + 1);
	}
};

	


// Create the elementary functions
for (var elemfn in unaryFunctions) {
	if (unaryFunctions.hasOwnProperty(elemfn)) {
		MathLib.extend('', elemfn, new MathLib.Functn(unaryFunctions[elemfn], {name: elemfn, contentMathMLString: mathStart + elemfn + mathEnd}));
	}
}


MathLib.identity = new MathLib.Functn(function identity(x) {
		return x;
	}, {contentMathMLString: mathStart + 'ident' + mathEnd}
);



// These functions will be added to the functn prototype soon.
var functionList1 = {
	arctan2: Math.atan2,
	binomial: function (n, k) {
				var binomial = 1, i;

				// or k > n > 0
				if (k < 0 || (n > 0 && k > n)) {
					return 0;
				}

				// Optimizing n and k are integers
				// if (n % 1 === 0 && k % 1 === 0) {
				// TODO: is this formula working if n is not an integer?
					if (n < 0) {
						binomial = Math.pow(-1, k);
						n = k - n - 1;
					}
					if (k > n / 2) {
						k = n - k;
					}
					for (i = 1; i <= k; i++) {
						binomial *= (n + 1 - i) / i;
					}
					return binomial;
			},
	cbrt: function (x) {
					var a3, a3x, an, a;

					// Handle &plusmn;0, NaN, &plusmn;&infin;
					if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
						return x;
					}
					
					// Get an approximation
					a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);

					// Halley's method
					while (true) {
						a3 = Math.pow(a, 3);
						a3x = a3 + x;
						an = a * (a3x + x) / (a3x + a3);
						if (MathLib.isZero(an - a)) {
							break; 
						}
						a = an;
					}
					return an;
				},
	conjugate: function (x) {
				return x;
			},
	copy: function (x) {
				return x;
			},
	degToRad: function (x) {
			// Math.PI / 180 = 57.29577951308232
				return x * 0.017453292519943295;
			},
	digitsum: function (x) {
				var out = 0;
				while (x > 9) {
					out += x % 10;
					x = Math.floor(x / 10);
				}
				return out + x;
			},
	divide: function (a, b) {
				return MathLib.times(a, MathLib.inverse(b));
			},
	divisors: function (x) {
				var divisors = x === 1 ? [] : [1],
						i, ii;
				for (i = 2, ii = x / 2; i <= ii; i++) {
					if (x % i === 0) {
						divisors.push(i);
					}
				}
				divisors.push(x);
				return MathLib.set(divisors);
			},
	factor: function (n) {
				var factors = [],
						i;
				n = Math.abs(n);
				while (n % 2 === 0) {
					n = n / 2;
					factors.push(2);
				}

				i = 3;
				while (n !== 1) {
					while (n % i === 0) {
						n = n / i;
						factors.push(i);
					}
					i += 2;
				}
				return new MathLib.Set(factors, true);
			},
	factorial: function (x) {
				var factorial = 1, i;
				if ((x > 170 && MathLib.isInt(x)) || x === Infinity ) {
					return Infinity;
				}
				if (x < 0 || !MathLib.isInt(x) || MathLib.isNaN(x)) {
					return NaN;
				}
				for (i = 1; i <= x; i++) {
					factorial *= i;
				}
				return factorial;
			},
	fallingFactorial: function (n, m, s) {
				var factorial = 1, j;
				s = s || 1;

				for (j = 0; j < m; j++) {
					factorial  *= (n - j * s);
				}
				return factorial;
			},
	fibonacci: function (n) {
				return Math.floor(Math.pow(MathLib.goldenRatio, n) / Math.sqrt(5));
			},
	hypot: function (a, b) {
				var args, x, y;

				if (arguments.length === 1) {
					return Math.abs(a);
				}

				if (arguments.length > 2) {
					args = Array.prototype.slice.call(arguments);
					args.shift();
					b = MathLib.hypot.apply(null, args);
				}

				a = MathLib.abs(a);
				b = MathLib.abs(b);

				// Return Infinity if one value is infinite
				if (a === Infinity || b === Infinity) {
					return Infinity;
				}

				// Return +0 if both values are ±0 (see IEEE 754-2008, 9.2.1)
				if (a === 0 && b === 0) {
					return 0;
				}

				x = Math.max(a, b);
				y = Math.min(a, b);

				return x * Math.sqrt(1 + Math.pow(y / x, 2));
			},
	hypot2: function () {
				var args = Array.prototype.slice.call(arguments);
				// Return Infinity if one value is infinite
				if (args.some(function (x) {
					return x === Infinity || x === -Infinity;
				})) {
					return Infinity;
				}
				return args.reduce(function (old, cur) {
					return old + cur * cur;
				}, 0);
			},
	isFinite: function (x) {
			 return Math.abs(x) < Infinity;
			},
	isInt: function (x) {
				return x % 1 === 0;
			},
	isNaN: function (x) {
				return x !== x;
			},
	isNegZero: function (x) {
				return 1 / x === -Infinity;
			},
	isOne: function (a)    {
				return Math.abs(a - 1) < MathLib.epsilon;
			},
	isPosZero: function (x) {
				return 1 / x === Infinity;
			},
	isPrime: function (x) {
				var sqrt = Math.sqrt(x), i;
				if (x % 1 === 0 && x > 1) {
					if (x === 2) {
						return true;
					}
					if (x % 2 === 0) {
						return false;
					}
					for (i = 3; i <= sqrt; i += 2) {
						if (x % i === 0) {
							return false;
						}
					}
					return true;
				}
				return false;
			},
	isReal: function (a)    {
				return true;
			},
	isZero: function (x) {
				return Math.abs(x) < MathLib.epsilon;
			},
	lg: function (x) {
				return Math.log(x) / Math.LN10;
			},
	ln: Math.log,
	log: function (base, x) {
				if (arguments.length === 1) {
					x = base;
					base = 10;
				}
				return Math.log(x) / Math.log(base);
			},
	minus: function (a, b) {
				return MathLib.plus(a, MathLib.negative(b));
			},
	mod: function (n, m) {
				var nm = n % m;
				return nm >= 0 ? nm : nm + m;
			},
	negative: function (x) {
				return -x;
			},
	pow: function (x, y) {
				if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
					return 1;
				}
				return Math.pow(x, y);
			},
	radToDeg: function (x) {
				// 180 / Math.PI = 57.29577951308232
				return x * 57.29577951308232;
			},
	random: Math.random,
	risingFactorial: function (n, m, s) {
				var factorial = 1, j;
				s = s || 1;

				for (j = 0; j < m; j++) {
					factorial  *= (n + j * s);
				}
				return factorial;
			},
	round: function (x) {
				// Some implementations have a bug where Math.round(-0) = +0 (instead of -0).
				if (x === 0) {
					return x;
				}
				return Math.round(x);
			},
	root: function (x, root) {
				if (arguments.length === 1) {
					return Math.sqrt(x);
				}
				return Math.pow(x, 1 / root);
			},
	sign: function (x) {
				return x && (x < 0 ? -1 : 1);
			},
	sqrt: Math.sqrt,
	trunc: function (x, n) {
				return x.toFixed(n || 0);
			},
	toLaTeX: function (x, plus) {
				if (plus) {
					return (x < 0 ? '-' : '+') + Math.abs(x);
				}
				else {
					return (x < 0 ? '-' : '') + Math.abs(x);
				}
			},
	toMathMLString: function (x, plus) {
				if (plus) {
					return '<mo>' + (x < 0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
				}
				else {
					return (x < 0 ? '<mo>-</mo>': '') + '<mn>' + Math.abs(x) + '</mn>';
				}
			},
	toString: function (x, plus) {
				if (plus) {
					return (x < 0 ? '-' : '+') + Math.abs(x);
				}
				else {
					return (x < 0 ? '-' : '') + Math.abs(x);
				}
			}
};

MathLib.toContentMathMLString = function (x) {
	if (typeof x === 'number') {
		return '<cn>' + x + '</cn>';
	}
	else {
		return x.toContentMathML();
	}
};




// ### MathLib.not()
// Negates the argument.
// 
// *@param {boolean}* Expects one boolean argument  
// *@return {boolean}*
MathLib.not = function (x) {
	return !x;
};



MathLib.compare = function (a, b) {
	if (MathLib.type(a) !== MathLib.type(b)) {
		return MathLib.sign(MathLib.type(a).localeCompare(MathLib.type(b)));
	}
	else if (typeof a === 'number') {
		return MathLib.sign(a - b);
	}
	else if (typeof a === 'string') {
		return a.localeCompare(b);
	}
	return a.compare(b);
};

MathLib.type = function (x) {
	if (x === null) {
		return 'null';
	}
	if (x === undefined) {
		return 'undefined';
	}
	// The name property for DOM objects is undefined in Firefox.
	return x.type ? x.type : (x.constructor.name || Object.prototype.toString.call(x).slice(8, -1)).toLowerCase();
};

MathLib.is = function (obj, type) {
	// if (MathLib.type(obj) === type) {
	//   return true;
	// }
	// return prototypes[type] ? prototypes[type].isPrototypeOf(obj) : typeof obj === type;

	do {
		if (MathLib.type(obj) === type) {
			return true;
		}
		obj = Object.getPrototypeOf(Object(obj));
	}
	while (obj);

	return false;
};


// Functions that act on set-like structures and return one single number/matrix...
var nAryFunctions = {
	// ### MathLib.and()
	// Returns true iff all arguments are true.
	// 
	// *@param {boolean}* Expects an arbitrary number of boolean arguments  
	// *@return {boolean}*
	and: function (n) {
		return n.every(function (x) {return !!x;});
	},
	arithMean: function (n) {
		return MathLib.plus(n) / n.length;
	},
	gcd: function (a) {
		var min,
				reduction = function (x) {
					return x !== min ? x % min : x;
				},
				isntZero = function (x) {
					return x !== 0;
				};

		// remove zeros and make negative values positive
		a = a.filter(isntZero).map(Math.abs);

		if (a.length === 0) {
			return 0;
		}

		while (a.length > 1) {
			min = MathLib.min(a);
			a = a.map(reduction).filter(isntZero);
		}
		return a[0] || min;
	},
	geoMean: function (n) {
		return MathLib.root(MathLib.times(n), n.length);
	},
	harmonicMean: function (n) {
		return n.length / MathLib.plus(n.map(MathLib.inverse));
	},
	lcm: function (n) {
		return MathLib.times(n) / MathLib.gcd(n);
	},
	max: function (n) {
		return Math.max.apply(null, n);
	},
	min: function (n) {
		return Math.min.apply(null, n);
	},
	// ### MathLib.or()
	// Returns true iff at least one argument is true.
	// 
	// *@param {boolean}* Expects an arbitrary number of boolean arguments  
	// *@return {boolean}*
	or: function (n) {
		return n.some(function (x) {return !!x;});
	},
	plus: function (n) {
		if (n.length === 0) {
			return 0;
		}
		return n.reduce(function (a, b) {
			var f1, f2, astr, bstr;
			if (typeof a === 'number' && typeof b === 'number') {
				return a + b;
			}
			else if (a.type === 'functn' || b.type === 'functn') {
				astr = a.type === 'functn' ? a.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(a);
				bstr = b.type === 'functn' ? b.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(b);
				f1 = a;
				f2 = b;
				if (a.type !== 'functn') {
					f1 = function () {
						return a;
					};
				}
				else if (b.type !== 'functn') {
					f2 = function () {
						return b;
					};
				}
				var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><plus/>' + astr + bstr + '</apply></lambda></math>';
				return new MathLib.Functn(function (x) {
					return MathLib.plus(f1(x), f2(x));
				}, {
					contentMathMLString: MathML
				});
			}
			else if (typeof a === 'object') {
				return a.plus(b);
			}
			// We're assuming that the operations are commutative
			else if (typeof b === 'object') {
				return b.plus(a);
			}
		});
	},
	times: function (n) {
		if (n.length === 0) {
			return 1;
		}
		return n.reduce(function (a, b) {
			var f1, f2, astr, bstr;
			if (typeof a === 'number' && typeof b === 'number') {
				return a * b;
			}
			else if (a.type === 'functn' || b.type === 'functn') {
				astr = a.type === 'functn' ? a.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(a);
				bstr = b.type === 'functn' ? b.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(b);
				f1 = a;
				f2 = b;
				if (a.type !== 'functn') {
					f1 = function () {
						return a;
					};
				}
				else if (b.type !== 'functn') {
					f2 = function () {
						return b;
					};
				}
				var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><times/>' + astr + bstr + '</apply></lambda></math>';
				return new MathLib.Functn(function (x) {
					return MathLib.times(f1(x), f2(x));
				}, {
					contentMathMLString: MathML
				});
			}
			else if (typeof a === 'object') {
				return a.times(b);
			}
			// We're assuming that the operations are commutative
			else if (typeof b === 'object') {
				return b.times(a);
			}
		});
	},
	// ### MathLib.xor()
	// Returns true iff an odd number of the arguments is true.
	// 
	// *@param {boolean}* Expects an arbitrary number of boolean arguments  
	// *@return {boolean}*
	xor: function (n) {
		return n.reduce(function (x, y) {return x + !!y;}, 0) % 2 !== 0;
	}	
};
 


// ### MathLib.plus()
// Returns the sum of all arguments.
// 
// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
// *@return {number, MathLib object}*
/*MathLib.plus = function (n) {
	return n.reduce(function (a, b) {
		var f1, f2, astr, bstr;
		if (typeof a === 'number' && typeof b === 'number') {
			return a + b;
		}
		else if (a.type === 'functn' || b.type === 'functn') {
			astr = a.type === 'functn' ? a.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(a);
			bstr = b.type === 'functn' ? b.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(b);
			f1 = a;
			f2 = b;
			if (a.type !== 'functn') {
				f1 = function () {
					return a;
				};
			}
			else if (b.type !== 'functn') {
				f2 = function () {
					return b;
				};
			}
			var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/>' + astr + bstr + '</apply></lambda></math>';
			return MathLib.functn(function (x) {
				return MathLib.plus(f1(x), f2(x));
			}, {
				contentMathMLString: MathML
			});
		}
		else if (typeof a === 'object') {
			return a.plus(b);
		}
		/ / We're assuming that the operations are commutative
		else if (typeof b === 'object') {
			return b.plus(a);
		}
	});
};
*/


// ### MathLib.isEqual()
// Determines if all arguments are equal.
// 
// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
// *@return {boolean}*
MathLib.isEqual = function () {
	return flatten(Array.prototype.slice.apply(arguments)).every(function (a, i, args) {
		if (a === args[0]) {
			return true;
		}
		else if (typeof a === 'number' && typeof args[0] === 'number') {
			return Math.abs(a - args[0]) <= 3e-15;
		}
		else if (typeof a === 'object') {
			return a.isEqual(args[0]);
		}
		else if (typeof args[0] === 'object') {
			return args[0].isEqual(a);
		}
		return false;
	});
};



// ### MathLib.times()
// Returns the product of all arguments.
// 
// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
// *@return {boolean}*
/*MathLib.times = function () {
	return Array.prototype.slice.apply(arguments).reduce(function (a, b) {
		var f1, f2, astr, bstr;
		if (typeof a === 'number' && typeof b === 'number') {
			return a * b;
		}
		else if (a.type === 'functn' || b.type === 'functn') {
			astr = a.type === 'functn' ? a.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(a);
			bstr = b.type === 'functn' ? b.contentMathML.childNodes[0].apply.outerMathML : MathLib.toContentMathMLString(b);
			f1 = a;
			f2 = b;
			if (a.type !== 'functn') {
				f1 = function () {
					return a;
				};
			}
			else if (b.type !== 'functn') {
				f2 = function () {
					return b;
				};
			}
			var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><times/>' + astr + bstr + '</apply></lambda></math>';
			return MathLib.functn(function (x) {
				return MathLib.times(f1(x), f2(x));
			}, {
				contentMathMLString: MathML
			});
		}
		else if (typeof a === 'object') {
			return a.times(b);
		}
		/ / We're assuming that the operations are commutative 
		else if (typeof b === 'object') {
			return b.times(a);
		}
	});
};
*/


var createFunction1 = function (f, name) {
	return function (x) {
		if (typeof x === 'number') {
			return f.apply('', arguments);
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'set') {
			return new MathLib.Set( x.map(f) );
		}
		else if (x.type === 'complex') {
			return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (Array.isArray(x)) {
			return x.map(f);
		}
		else {
			return x[name]();
		}
	};
};


var createFunction3 = function (f, name) {
	return function (n) {
		if (MathLib.type(n) === 'set') {
			return f(n.slice());
		}
		else if (MathLib.type(n) !== 'array') {
			n = Array.prototype.slice.apply(arguments);
		}
		return f(n);
	};
};
 

// Add the functions to the MathLib object
var func, cur;
for (func in functionList1) {
	if (functionList1.hasOwnProperty(func)) {

		cur = functionList1[func];
		Object.defineProperty(MathLib, func, {
			value: createFunction1(functionList1[func], func)
		});
	}
}



for (func in nAryFunctions) {
	if (nAryFunctions.hasOwnProperty(func)) {

		cur = nAryFunctions[func];
		Object.defineProperty(MathLib, func, {
			value: createFunction3(nAryFunctions[func], func)
		});

	}
}