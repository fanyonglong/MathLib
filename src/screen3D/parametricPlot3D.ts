// ### Matrix.parametricPlot3D()
// 
//
// *@param {function}* The function which is called on every argument  
// *@returns {screen3D}*
parametricPlot3D(f, options) {

	var defaults = {
				closed: false,
				debug: false,
				min: 0,
				max: 1,
				pointNum: 1000,
				radius: 0.05,
				segmentsRadius: 6,
				material: {
					type: 'MeshLambert'
				}
			},
			opts = extendObject(defaults, options),


			curve = THREE.Curve.create(
				function() {},
				function(t) {
					t = (opts.max - opts.min) * t + opts.min;
					var res = f(t);
					return new THREE.Vector3(res[0], res[1], res[2]);
				}
			),
		

			mesh = new THREE.Mesh(
				new THREE.TubeGeometry(new curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug),
				new THREE[opts.material.type + 'Material'](opts.material)
			);


	this.scene.add(mesh);


	/*
	guiObj = {
		color: [mesh.material.color.r, mesh.material.color.g, mesh.material.color.b]
	};


	var folder = _3D.datGUI.addFolder(options.name);
	folder.add(mesh, 'visible');
	folder.addColor(guiObj, 'color')
		.onChange(function(value){mesh.material.color.setRGB(value[0]/255, value[1]/255, value[2]/255);});
	*/

	return this;
}