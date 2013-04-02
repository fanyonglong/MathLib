module MathLib {
	class MathML {
		public type: string;
		public attributes: any;
		public childNodes: any;
		public innerMathML: any;
		public outerMathML: any;
		public nodeName: any;
		public nextNode: any;
		public parentNode: any;
		public prevNode: any;
		constructor(MathMLString);
		static isSupported: () => bool;
		public loadMathJax(config: string): void;
		public parse(): any;
		public toMathMLString(): string;
		public toString(): string;
		static variables: {};
		static write(id: string, math: string): void;
	}
	class Screen {
		public type: string;
		public container: any;
		public figure: any;
		public wrapper: any;
		public contextMenu: any;
		public contextMenuOverlay: any;
		public height: number;
		public width: number;
		public origHeight: number;
		public origWidth: number;
		public options: any;
		public renderer: any;
		public element: any;
		public innerHTMLContextMenu: string;
		public camera: any;
		constructor(id: string, options?: {});
		public oncontextmenu(evt): void;
	}
	class Layer {
		public ctx: any;
		public element: any;
		public id: string;
		public screen: any;
		public zIndex: number;
		public stack: any;
		public transformation: any;
		public applyTransformation: any;
		public draw: any;
		public circle: any;
		public line: any;
		public path: any;
		public pixel: any;
		public point: any;
		public text: any;
		constructor(screen, id: string, zIndex);
	}
	class Screen2D extends Screen {
		public type: string;
		public applyTransformation: any;
		public background: any;
		public renderer: any;
		public axis: any;
		public grid: any;
		public layer: any;
		public element: any;
		public init: any;
		public redraw: any;
		public drawAxis: any;
		public drawGrid: any;
		public draw: any;
		public circle: any;
		public line: any;
		public path: any;
		public pixel: any;
		public point: any;
		public text: any;
		public transformation: any;
		public translation: any;
		public scale: any;
		public lookAt: any;
		public range: any;
		public interaction: any;
		public zoomSpeed: any;
		constructor(id: string, options?: {});
		public resize(width: number, height: number): Screen2D;
		public getEventPoint(evt);
		public getLineEndPoints(l);
		public onmousedown(evt): void;
		public onmousemove(evt): void;
		public onmouseup(evt): void;
		public onmousewheel(evt): void;
	}
	class Screen3D extends Screen {
		public type: string;
		public grid: any;
		public axis: any;
		public render: any;
		public camera: any;
		public element: any;
		public scene: any;
		constructor(id: string, options?: {});
		public drawGrid(): Screen3D;
		public parametricPlot3D(f, options): Screen3D;
		public plot3D(f, options): Screen3D;
		public resize(width: number, height: number): Screen3D;
		public surfacePlot3D(f, options): Screen3D;
	}
	class Vector {
		public type: string;
		public length: number;
		constructor(coords: number[]);
		static areLinearIndependent: (v: Vector[]) => bool;
		public every(f: (value: any, index: number, vector: Vector) => bool): bool;
		public forEach(f: (value: any, index: number, vector: Vector) => void): void;
		public isEqual(v: Vector): bool;
		public isZero(): bool;
		public map(f: (value: any, index: number, vector: Vector) => any): any;
		public minus(v: Vector): Vector;
		public negative(): Vector;
		public norm(p?: number): number;
		public outerProduct(v: Vector): Matrix;
		public plus(v: Vector): Vector;
		public reduce(...args: any[]): any;
		public scalarProduct(v: Vector): any;
		public slice(...args: any[]): any[];
		public times(n: any): any;
		public toArray(): any[];
		public toContentMathMLString(): string;
		public toLaTeX(): string;
		public toMathMLString(): string;
		public toString(): string;
		public vectorProduct(v: Vector): Vector;
		static zero: (n: number) => Vector;
	}
	class Circle {
		public type: string;
		public center: Point;
		public radius: number;
		constructor(center: any, radius: number);
		public area(): number;
		public circumference(): number;
		public draw(screen, options): Circle;
		public isEqual(c: Circle): bool;
		public positionOf(p): string;
		public reflectAt(a): Circle;
		public toLaTeX(): string;
		public toMatrix(): Matrix;
	}
	class Complex {
		public type: string;
		public re: number;
		public im: number;
		constructor(re: number, im: number);
		static infinity: string;
		public abs(): number;
		public arccos(): Complex;
		public arccot(): Complex;
		public arccsc(): Complex;
		public arcsin(): Complex;
		public arctan(): Complex;
		public arg(): number;
		public artanh(): Complex;
		public compare(x): number;
		public conjugate(): Complex;
		public copy(): Complex;
		public cos(): Complex;
		public cosh(): Complex;
		public divide(c): Complex;
		public exp(): Complex;
		public inverse(): Complex;
		public isEqual(n): bool;
		public isFinite(): bool;
		public isOne(): bool;
		public isReal(): bool;
		public isZero(): bool;
		public ln(): Complex;
		public minus(c): Complex;
		public negative(): Complex;
		static one: Complex;
		public plus(c): Complex;
		static polar: (abs: any, arg: any) => Complex;
		public pow(n): Complex;
		public sign(): Complex;
		public sin(): Complex;
		public sinh(): Complex;
		public times(c): Complex;
		public toContentMathMLString(): String;
		public toLaTeX(): string;
		public toMathMLString(): string;
		public toMatrix(): Matrix;
		public toPoint(): Point;
		public toString(): string;
		static zero: Complex;
	}
	class Line extends Vector {
		public type: string;
		public dimension: number;
		constructor(coords: number[]);
		public draw(screen, options): Line;
		public isEqual(q: Line): bool;
		public isFinite(): bool;
		public isOrthogonalTo(l: Line): Line;
		public isParallelTo(l: Line): bool;
		public meet(l: Line, dyn?: bool): Point;
		public normalize(): Line;
	}
	class Matrix {
		public type: string;
		public length: number;
		public cols: number;
		public rows: number;
		public LUpermutation: Permutation;
		constructor(matrix);
		public LU(dontSwapPivot?: bool);
		public adjoint(): Matrix;
		public adjugate(): Matrix;
		public cholesky(): Matrix;
		public copy(): Matrix;
		public determinant(): any;
		public diag(): any[];
		public divide(n: any): Matrix;
		public every(f);
		public forEach(f): void;
		public gershgorin(): any[];
		public givens(): any[];
		static givensMatrix: (n: any, i: any, k: any, phi: any) => any;
		static identity: (n: any) => any;
		public inverse(): Matrix;
		public isBandMatrix(l, u);
		public isDiag(): bool;
		public isEqual(x): bool;
		public isIdentity();
		public isInvertible(): bool;
		public isLower();
		public isNegDefinite();
		public isOrthogonal();
		public isPermutation(): bool;
		public isPosDefinite();
		public isReal();
		public isScalar(): bool;
		public isSquare(): bool;
		public isSymmetric(): bool;
		public isUpper();
		public isVector(): bool;
		public isZero();
		public map(f);
		public minor(r, c);
		public minus(m);
		public negative();
		static numbers: (n: any, r: any, c: any) => any;
		static one: (r: any, c: any) => any;
		public plus(m);
		static random: (r: any, c: any) => any;
		public rank(): number;
		public reduce(...args: any[]);
		public remove(row, col);
		public rref();
		public slice(...args: any[]);
		public solve(b);
		public some(f): bool;
		public times(a);
		public toArray();
		public toColVectors(): string;
		public toComplex(): Complex;
		public toContentMathMLString(): string;
		public toLaTeX(): string;
		public toMathMLString(): string;
		public toRowVectors(): string;
		public toString(): string;
		public trace();
		public transpose(): Matrix;
		static zero: (r: any, c: any) => any;
	}
	class Permutation {
		public type: string;
		public length: number;
		public cycle: any[];
		constructor(p);
		public applyTo(n: any): any;
		static cycleToList(cycle: any): number[];
		static id: Permutation;
		public inverse(): Permutation;
		static listToCycle(list: number[]): any;
		public map(...args: any[]): Permutation;
		public sgn(): number;
		public times(p: Permutation): Permutation;
		public toMatrix(n: number): Matrix;
		public toString(): string;
	}
	class Point extends Vector {
		public dimension: number;
		constructor(coords: number[]);
		static I: Point;
		static J: Point;
		public crossRatio(a: Point, b: Point, c: Point, d: Point): number;
		public distanceTo(point: Point): number;
		public draw(screen, options): Point;
		public isEqual(q: Point): bool;
		public isFinite(): bool;
		public isInside(a: Circle): bool;
		public isOn(a: Circle): bool;
		public isOutside(a: Circle): bool;
		public lineTo(q: Point, dyn?: bool): Line;
		public normalize(): Point;
		public reflectAt(a: Point): Point;
		public toComplex(): Complex;
		public toLaTeX(opt?: bool): string;
		public toMathMLString(opt?: bool): string;
		public toString(opt?: bool): string;
	}
	class Polynomial {
		public type: string;
		public deg: number;
		public length: number;
		public subdeg: number;
		constructor(polynomial);
		public differentiate(n?: number): Polynomial;
		public draw(screen, options): Polynomial;
		public every(f: (value: any, index: number, vector: Vector) => bool): bool;
		public forEach(): void;
		public integrate(n?: number): Polynomial;
		public interpolation(a, b);
		public isEqual(p: Polynomial): bool;
		public map(f): Polynomial;
		public negative(): Polynomial;
		static one: Polynomial;
		public plus(a): Polynomial;
		static regression(x, y): Polynomial;
		static roots(zeros): Polynomial;
		public slice(...args: any[]): any[];
		public tangent(p): Polynomial;
		public times(a): Polynomial;
		public toContentMathMLString(math): string;
		public toFunctn();
		public toLaTeX(): string;
		public toMathMLString(math): string;
		public toString(opt): string;
		public valueAt(x);
		static zero: Polynomial;
	}
	class Rational {
		public type: string;
		public numerator: number;
		public denominator: number;
		constructor(numerator: number, denominator?: number);
		public divide(r);
		public inverse(): Rational;
		public isEqual(r): bool;
		public isZero(): bool;
		public minus(r);
		public negative(): Rational;
		public plus(r);
		public reduce(): Rational;
		public times(r);
		public toContentMathMLString(): String;
		public toLaTeX(): String;
		public toMathMLString(): String;
		public toNumber(): number;
		public toString(): String;
	}
	class Set {
		public type: string;
		public length: number;
		public card: number;
		constructor(elements);
		public compare(x: any): number;
		public every(...args: any[]): bool;
		public filter(...args: any[]): Set;
		public forEach(...args: any[]): void;
		static fromTo: (f: number, t: number, s: number) => Set;
		public indexOf(...args: any[]): number;
		public insert(x: any): Set;
		public isEmpty(): bool;
		public isEqual(x: Set): bool;
		public isSubsetOf(a: Set): bool;
		public locate(x: any): number;
		public map(...args: any[]): any;
		public plus(n: any): any;
		public powerset(): Set;
		public reduce(...args: any[]): any;
		public remove(a: any): Set;
		static createSetOperation: (left: any, both: any, right: any) => (a: any) => any;
		public union: (a: any) => any;
		public intersect: (a: any) => any;
		public without: (a: any) => any;
		public xor: (a: any) => any;
		public slice(...args: any[]): any;
		public splice(...args: any[]): any;
		public times(n: any): any;
		public toArray(): any[];
		public toContentMathMLString(): string;
		public toLaTeX(): string;
		public toMathMLString(): string;
		public toString(): string;
	}
}
