var gotaMesh = new THREE.Mesh();
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

//BEGIN OPTIONS FOR DAT GUI
var options = {
	velrotx: 0,
	velroty: 0,
	velrotz: 0,
	rotx: - Math.PI/2,
	roty: 0,
	rotz: 0,
	red_intensity: 77,
	green_intensity: 219,
	blue_intensity: 255,
	default_color: 5102591,
	numVertices: 30,
	wireframe_option: true,
	
	use_material_color: function(){
		buildMaterial();
		updateMaterialColor();
	},
	
	use_cartesian_color: function(){
		buildCartesianColors();
	},
	
	use_spheric_color: function(){
		buildSphericColors();
	},
	
	stop_rotation: function(){
		this.velrotx = 0;
		this.velroty = 0;
		this.velrotz = 0;
	},
	
	reset_rotation: function(){
		gotaMesh.rotation.x = 2*Math.PI - Math.PI/2;
		gotaMesh.rotation.y = 0;
		gotaMesh.rotation.z = 0;
	},
	
	reset_default_color: function(){
		this.red_intensity = 77;
		this.green_intensity = 219;
		this.blue_intensity = 255;
		gotaMesh.material.color.setHex(this.default_color);
	}
	
}

//END OF OPTIONS FOR DAT GUI

//UPDATE SECTION

function updateMaterialColor(){
	options.red_intensity = parseInt(options.red_intensity);
	options.green_intensity = parseInt(options.green_intensity);
	options.blue_intensity = parseInt(options.blue_intensity);
	gotaMesh.material.color.setHex(256*256*options.red_intensity + 256*options.green_intensity+options.blue_intensity);
}

function updateWireframe(){
	gotaMesh.material.wireframe = options.wireframe_option;
}

function updateRotation(){
	gotaMesh.rotation.x = options.rotx;
	gotaMesh.rotation.y = options.roty;
	gotaMesh.rotation.z = options.rotz;
}

//END OF UPDATE SECTION

//BUILD SECTION

function buildGeometry(){
	var gotaGeometry = new THREE.Geometry();
	var vcnt = 0;
	var layer = -1;
	for(it=0; it<=options.numVertices; it++){
		var i = it*Math.PI/options.numVertices;
		var z = Math.cos(i);
		layer++;
		for(it2 = 0; it2<=options.numVertices; it2++){
			if(it == 0) vcnt++;
			var j = (it2%options.numVertices)*2*Math.PI/options.numVertices;
			var x = 0.5*(1 - Math.cos(i))*Math.sin(i)*Math.cos(j);	
			var y = 0.5*(1 - Math.cos(i))*Math.sin(i)*Math.sin(j);
		 	gotaGeometry.vertices.push(new THREE.Vector3(x,y,z));
		}
		if(it == 0) continue;
		for(p1 = (layer-1)*vcnt, p2 = layer*vcnt; p2 < (layer+1)*vcnt-1; p1++, p2++){
			gotaGeometry.faces.push(new THREE.Face3(p2, p2+1, p1));
			gotaGeometry.faces.push(new THREE.Face3(p2+1, p1+1, p1));
		}
	}
	gotaMesh.geometry = gotaGeometry;
}

function buildMaterial(){
	gotaMesh.material = new THREE.MeshBasicMaterial({vertexColors: THREE.NoColors, wireframe: options.wireframe_option});
}

function buildCartesianColors(){

	var max_x = max_y = max_z = -500;
	var min_x = min_y = min_z = 500; 
	var new_geometry = new THREE.Geometry().copy(gotaMesh.geometry);
	for(i = 0; i< new_geometry.vertices.length; i++){
		max_x = Math.max(max_x, new_geometry.vertices[i].x);
		min_x = Math.min(min_x, new_geometry.vertices[i].x);
		max_y = Math.max(max_y, new_geometry.vertices[i].y);
		min_y = Math.min(min_y, new_geometry.vertices[i].y);
		max_z = Math.max(max_z, new_geometry.vertices[i].z);
		min_z = Math.min(min_z, new_geometry.vertices[i].z);
	}
	for(i = 0; i<new_geometry.faces.length; i++){
		var a = new_geometry.faces[i].a;
		var b = new_geometry.faces[i].b;
		var c = new_geometry.faces[i].c;
		var c1 = (new_geometry.vertices[a].x - min_x)/(max_x - min_x);
		var c2 = (new_geometry.vertices[a].y - min_y)/(max_y - min_y);
		var c3 = (new_geometry.vertices[a].z - min_z)/(max_z - min_z);
		new_geometry.faces[i].vertexColors[0] = new THREE.Color(c1,c2,c3);
		c1 = (new_geometry.vertices[b].x - min_x)/(max_x - min_x);
		c2 = (new_geometry.vertices[b].y - min_y)/(max_y - min_y);
		c3 = (new_geometry.vertices[b].z - min_z)/(max_z - min_z);
		new_geometry.faces[i].vertexColors[1] = new THREE.Color(c1,c2,c3);
		c1 = (new_geometry.vertices[c].x - min_x)/(max_x - min_x);
		c2 = (new_geometry.vertices[c].y - min_y)/(max_y - min_y);
		c3 = (new_geometry.vertices[c].z - min_z)/(max_z - min_z);
		new_geometry.faces[i].vertexColors[2] = new THREE.Color(c1,c2,c3);
	}
	
	new_material = new THREE.MeshBasicMaterial({color: gotaMesh.material.color, vertexColors: THREE.VertexColors, wireframe: gotaMesh.material.wireframe});
	
	scene.remove(gotaMesh);
	gotaMesh = new THREE.Mesh(new_geometry, new_material);
	
	scene.add(gotaMesh);
	gotaMesh.rotation.x -= Math.PI/2;

}

function buildSphericColor(){
	
}

//END OF BUILD SECTION

function run(){
	
	renderer.setSize(600, 600);
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	buildGeometry(options.numVertices);
	
	buildMaterial(options.default_color, THREE.NoColors, true);
	
	//DO ALL UPDATES
	updateMaterialColor();
	updateRotation();
	updateWireframe();
	
	scene.add(gotaMesh);

	
	//BEGIN DAT GUI CONTROL PANEL

	var gui = new dat.GUI({width : 400});
	
	var gui_rotation = gui.addFolder('Rotation');
	gui_rotation.add(options, 'rotx', 0, 2*Math.PI).step(0.001).name('X').listen().onChange(updateRotation);
	gui_rotation.add(options, 'roty', 0, 2*Math.PI).step(0.001).name('Y').listen().onChange(updateRotation);
	gui_rotation.add(options, 'rotz', 0, 2*Math.PI).step(0.001).name('Z').listen().onChange(updateRotation);
	gui_rotation.open();
	
	var gui_animated_rotation = gui.addFolder('Animated Rotation');
	gui_animated_rotation.add(options, 'velrotx', -0.1, 0.1).step(0.001).name('X').listen();
	gui_animated_rotation.add(options, 'velroty', -0.1, 0.1).step(0.001).name('Y').listen();
	gui_animated_rotation.add(options, 'velrotz', -0.1, 0.1).step(0.001).name('Z').listen();
	gui_animated_rotation.open();
	
	var gui_color_update = gui.addFolder('Color');
	gui_color_update.add(options, 'red_intensity', 0, 255).step(1).name('R').listen().onChange(updateMaterialColor);
	gui_color_update.add(options, 'green_intensity', 0, 255).step(1).name('G').listen().onChange(updateMaterialColor);
	gui_color_update.add(options, 'blue_intensity', 0, 255).step(1).name('B').listen().onChange(updateMaterialColor);
	gui_color_update.open();
	
	gui.add(options, 'numVertices', 3, 200).step(1).name('Resolution/No of Vertices').listen().onChange(buildGeometry);
	gui.add(options, 'reset_default_color').name('Reset to Default Color').listen();
	gui.add(options, 'stop_rotation').name('Stop Rotation').listen();
	gui.add(options, 'reset_rotation').name('Reset Rotation').listen();	
	gui.add(options, 'wireframe_option').name('Enable/Disable Wireframe').listen().onChange(updateWireframe);
	gui.add(options, 'use_material_color').name('Use Material Color').listen();
	gui.add(options, 'use_cartesian_color').name('Use Cartesian Color').listen();
	gui.add(options, 'use_spheric_color').name('Use Spheric Color').listen();
	
	//END OF DAT GUI CONTROL PANEL
	
	
	function animate(){
		requestAnimationFrame(animate);
		gotaMesh.rotation.x += options.velrotx;
		gotaMesh.rotation.y += options.velroty;
		gotaMesh.rotation.z += options.velrotz;
		
		//adjust rotation panel
		function adjust_gui_rotation_panel(){
			if(gotaMesh.rotation.x < 2*Math.PI) gotaMesh.rotation.x += 2*Math.PI;
			if(gotaMesh.rotation.x > 2*Math.PI) gotaMesh.rotation.x -= 2*Math.PI;
			if(gotaMesh.rotation.y < 2*Math.PI) gotaMesh.rotation.y += 2*Math.PI;
			if(gotaMesh.rotation.y > 2*Math.PI) gotaMesh.rotation.y -= 2*Math.PI;
			if(gotaMesh.rotation.z < 2*Math.PI) gotaMesh.rotation.z += 2*Math.PI;
			if(gotaMesh.rotation.z > 2*Math.PI) gotaMesh.rotation.z -= 2*Math.PI;
		}
		adjust_gui_rotation_panel();
		
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();
	

}
