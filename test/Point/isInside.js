test('.isInside()', 3, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([2, 0, 1]),
			p3 = new MathLib.Point([3, 0, 1]),
			c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
	equal(p1.isInside(c), true, '.isInside()');
	equal(p2.isInside(c), false, '.isInside()');
	equal(p3.isInside(c), false, '.isInside()');
});