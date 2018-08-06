var gotaMesh = new THREE.Mesh();
var gotaGroup = new THREE.Object3D();
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var sceneGroup = new THREE.Object3D();
var scales = [300, 1, 4, 1000, 40, 1, 30];

//0 - taper 1 - twist 2- shear //

//BEGIN OPTIONS FOR DAT GUI
var options = {
	velrotx: 0,
	velroty: 0,
	velrotz: 0,
	rotx: 0,
	roty: 0,
	rotz: 0,
	numVertices : 40,
	red_intensity: 77,
	green_intensity: 219,
	blue_intensity: 255,
	default_color: 5102591,
	wireframe_option: true,
	object: 0,
	taper_x: 1,
	taper_y: 1,
	taper_z: 1,
	twist_x: 0,
	twist_y: 0,
	twist_z: 0,
	shear_x: 0,
	shear_y: 0,
	shear_z: 0,
	multiplier: 100,
	
	increase_taper_x: function(){
	  this.taper_x = 2;
	  doTaperingX();
	},
	
	increase_taper_y: function(){
	  this.taper_y = 2;
	  doTaperingY();
	},
	
	increase_taper_z: function(){
	  this.taper_z = 2;
	  doTaperingZ();
	},
	
	decrease_taper_x: function(){
	  this.taper_x = 0.5;
	  doTaperingX();
	},
	
	decrease_taper_y: function(){
	  this.taper_y = 0.5;
	  doTaperingY();
	},
	
	decrease_taper_z: function(){
	  this.taper_z = 0.5;
	  doTaperingZ();
	},
	
	increase_twist_x: function(){
	  this.twist_x = Math.PI/(500/this.multiplier);
	  doTwistX();
	},
	
	increase_twist_y: function(){
	  this.twist_y = Math.PI/(500/this.multiplier);
	  doTwistY();
	},
	
	increase_twist_z: function(){
	  this.twist_z = Math.PI/(500/this.multiplier);
	  doTwistZ();
	},
	
	decrease_twist_x: function(){
	  this.twist_x = -Math.PI/(500/this.multiplier);
	  doTwistX();
	},
	
	decrease_twist_y: function(){
	  this.twist_y = -Math.PI/(500/this.multiplier);
	  doTwistY();
	},
	
	decrease_twist_z: function(){
	  this.twist_z = -Math.PI/(500/this.multiplier);
	  doTwistZ();
	},
	
	increase_shear_x: function(){
	  this.shear_x = 0.1;
	  doShearX();
	},
	
	increase_shear_y: function(){
	  this.shear_y = 0.1;
	  doShearY();
	},
	
	increase_shear_z: function(){
	  this.shear_z = 0.1;
	  doShearZ();
	},
	
	decrease_shear_x: function(){
	  this.shear_x = -0.1;
	  doShearX();
	},
	
	decrease_shear_y: function(){
	  this.shear_y = -0.1;
	  doShearY();
	},
	
	decrease_shear_z: function(){
	  this.shear_z = -0.1;
	  doShearZ();
	},
	
	stop_rotation: function(){
		this.velrotx = 0;
		this.velroty = 0;
		this.velrotz = 0;
	},
	
	reset_rotation: function(){
		this.rotx = 0;
		this.roty = 0;
		this.rotz = 0;
		updateRotation();
	},
	
	load_bunny: function(){
	  this.multiplier = 1;
	  loadBunny();
	},
	
	load_teapot: function(){
	  this.multiplier = 1;
	  loadTeapot();
	},
	
	load_butterfly: function(){
	  this.multiplier = 200;
	  loadButterfly();
	},
	
	load_bulbasaur: function(){
	  this.multiplier = 50;
	  loadBulbasaur();
	},
	
	load_city: function(){
	  this.multiplier = 1;
	  loadCity();
	},
	
	load_dragon: function(){
	  this.multiplier = 50;
	  loadDragon();
	},
	
	load_gota: function(){
	  this.multiplier = 100;
	  loadWaterDrop();
	}
	
}

//END OF OPTIONS FOR DAT GUI

// TRANSFORMATIONS SECTION

function doTaperingX(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      m.identity();
      m.set(1, 0, 0, 0,
            0, options.taper_x, 0, 0,
            0, 0, options.taper_x, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doTaperingY(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      m.identity();
      m.set(options.taper_y, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, options.taper_y, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doTaperingZ(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      m.identity();
      m.set(options.taper_z, 0, 0, 0,
            0, options.taper_z, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doTwistX(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      var z = mesh.geometry.vertices[i].x;
      m.identity();
      m.set(1, 0, 0, 0,
            0, Math.cos(options.twist_x*Math.abs(z)), -Math.sin(options.twist_x*Math.abs(z)), 0,
            0, Math.sin(options.twist_x*Math.abs(z)), Math.cos(options.twist_x*Math.abs(z)), 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doTwistY(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      var z = mesh.geometry.vertices[i].y;
      m.identity();
      m.set(Math.cos(options.twist_y*Math.abs(z)), 0, Math.sin(options.twist_y*Math.abs(z)), 0,
            0, 1, 0, 0,
            -Math.sin(options.twist_y*Math.abs(z)), 0, Math.cos(options.twist_y*Math.abs(z)), 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doTwistZ(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      var z = mesh.geometry.vertices[i].z;
      m.identity();
      m.set(Math.cos(options.twist_z*Math.abs(z)), -Math.sin(options.twist_z*Math.abs(z)), 0, 0,
            Math.sin(options.twist_z*Math.abs(z)), Math.cos(options.twist_z*Math.abs(z)), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doShearX(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      m.identity();
      m.set(1, 0, 0, 0,
            options.shear_x, 1, 0, 0,
            options.shear_x, 0, 1, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doShearY(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      m.identity();
      m.set(1, options.shear_y, 0, 0,
            0, 1, 0, 0,
            0, options.shear_y, 1, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

function doShearZ(){
  scene.remove(sceneGroup);
  var newGroup = sceneGroup.clone();
  var m = new THREE.Matrix4();
  newGroup.children.forEach(function(mesh){
    for(i = 0; i<mesh.geometry.vertices.length; i++){
      m.identity();
      m.set(1, 0, options.shear_z, 0,
            0, 1, options.shear_z, 0,
            0, 0, 1, 0,
            0, 0, 0, 1);
      mesh.geometry.vertices[i].applyMatrix4(m);
    }
    mesh.geometry.verticesNeedUpdate = true;
  });
  sceneGroup = newGroup.clone();
  scene.add(sceneGroup);
}

// END OF TRANSFORMATIONS SECTION

// LOAD SECTION

function loadBunny(){
  var loader = new THREE.OBJLoader();
  options.object = 1;
	loader.load('../Assets/Models/bunnyExp.obj', loadMesh);
}

function loadTeapot(){
  var loader = new THREE.OBJLoader();
  options.object = 2;
	loader.load('../Assets/Models/teapot.obj', loadMesh);
}

function loadButterfly(){
  var loader = new THREE.OBJLoader();
  options.object = 3;
	loader.load('../Assets/Models/butterfly.obj', loadMesh);
}

function loadBulbasaur(){
  var loader = new THREE.OBJLoader();
  options.object = 4;
	loader.load('../Assets/Models/Bulbasaur.obj', loadMesh);
}

function loadCity(){
  var loader = new THREE.OBJLoader();
  options.object = 5;
	loader.load('../Assets/Models/city.obj', loadMesh);
}

function loadDragon(){
  var loader = new THREE.OBJLoader();
  options.object = 6;
	loader.load('../Assets/Models/dragon.obj', loadMesh);
}

function loadWaterDrop(){
  options.object = 0;
  scene.remove(sceneGroup);
  var newGroup = new THREE.Object3D();
  buildGeometry();
	buildMaterial();
	newGroup.add(gotaMesh);
  sceneGroup = newGroup.clone();
  sceneGroup.scale.set(scales[options.object], scales[options.object], scales[options.object]);
  resetRotation();
  updateMaterialColor();
  scene.add(sceneGroup);
}

function loadMesh(loadedObj){
  scene.remove(sceneGroup);
  var newGroup = new THREE.Object3D();
  loadedObj.children.forEach(function(mesh){
    var newMaterial = new THREE.MeshBasicMaterial({color: options.default_color, wireframe: options.wireframe_option});
    var newGeometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry);
    newGroup.add(new THREE.Mesh(newGeometry, newMaterial));
  });
  newGroup.children.forEach(function(mesh){
    mesh.position.set(0,0,0);
  });
  sceneGroup = newGroup.clone();
  resetRotation();
  sceneGroup.scale.set(scales[options.object], scales[options.object], scales[options.object]);
  updateMaterialColor();
  scene.add(sceneGroup);
}

// END OF LOAD SECTION

//UPDATE SECTION

function updateMaterialColor(){
	options.red_intensity = parseInt(options.red_intensity);
	options.green_intensity = parseInt(options.green_intensity);
	options.blue_intensity = parseInt(options.blue_intensity);
	sceneGroup.children.forEach(function(mesh){
	  mesh.material.color.setHex(256*256*options.red_intensity + 256*options.green_intensity+options.blue_intensity);
	});
}

function updateWireframe(){
  sceneGroup.children.forEach(function(mesh){
	  mesh.material.wireframe = options.wireframe_option;
	});
}

function updateRotation(){
	sceneGroup.rotation.set(options.rotx, options.roty, options.rotz);
}

function updateOptionRotation(){
	options.rotx = sceneGroup.rotation.x;
	options.roty = sceneGroup.rotation.y;
	options.rotz = sceneGroup.rotation.z;
}

function resetRotation(){
  options.velrotx = 0;
	options.velroty = 0;
	options.velrotz = 0;
	options.rotx = 0;
	options.roty = 0;
	options.rotz = 0;
	updateRotation();
}

//END OF UPDATE SECTION

//BUILD SECTION

function buildGeometry(){
	var gotaGeometry = new THREE.Geometry();
	var vcnt = 0;
	var layer = -1;
	hslColors = [];
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
		 	hslColors.push(new THREE.Color().setHSL(i/Math.PI, 1.0, j/(2*Math.PI)));
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

//END OF BUILD SECTION

function run(){
	
	renderer.setSize(600, 600);
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	var camera = new THREE.OrthographicCamera(-700.0, 700.0, 700.0, -700.0, -700.0, 700.0);
	
	scene.add(camera);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	buildGeometry();
	
	buildMaterial();
	
	gotaGroup.add(gotaMesh);
	gotaGroup.scale.set(300, 300, 300);
	
	sceneGroup = gotaGroup.clone();
	
	//DO ALL UPDATES
	updateMaterialColor();
	updateWireframe();
	
	scene.add(sceneGroup);

	
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
	
	var gui_tapering = gui.addFolder('Tapering');
	gui_tapering.add(options, 'increase_taper_x').name('Increase rate on X').listen();
	gui_tapering.add(options, 'decrease_taper_x').name('Decrease rate on X').listen();
	gui_tapering.add(options, 'increase_taper_y').name('Increase rate on Y').listen();
	gui_tapering.add(options, 'decrease_taper_y').name('Decrease rate on Y').listen();
	gui_tapering.add(options, 'increase_taper_z').name('Increase rate on Z').listen();
	gui_tapering.add(options, 'decrease_taper_z').name('Decrease rate on Z').listen();
	
	var gui_tapering = gui.addFolder('Twist');
	gui_tapering.add(options, 'increase_twist_x').name('Increase rate on X').listen();
	gui_tapering.add(options, 'decrease_twist_x').name('Decrease rate on X').listen();
	gui_tapering.add(options, 'increase_twist_y').name('Increase rate on Y').listen();
	gui_tapering.add(options, 'decrease_twist_y').name('Decrease rate on Y').listen();
	gui_tapering.add(options, 'increase_twist_z').name('Increase rate on Z').listen();
	gui_tapering.add(options, 'decrease_twist_z').name('Decrease rate on Z').listen();
	
	var gui_tapering = gui.addFolder('Shear');
	gui_tapering.add(options, 'increase_shear_x').name('Increase rate on X').listen();
	gui_tapering.add(options, 'decrease_shear_x').name('Decrease rate on X').listen();
	gui_tapering.add(options, 'increase_shear_y').name('Increase rate on Y').listen();
	gui_tapering.add(options, 'decrease_shear_y').name('Decrease rate on Y').listen();
	gui_tapering.add(options, 'increase_shear_z').name('Increase rate on Z').listen();
	gui_tapering.add(options, 'decrease_shear_z').name('Decrease rate on Z').listen();
	
	gui.add(options, 'load_bunny').name('Load Bunny Object').listen();
	gui.add(options, 'load_teapot').name('Load Teapot Object').listen();
	gui.add(options, 'load_butterfly').name('Load Butterfly Object').listen();
	gui.add(options, 'load_bulbasaur').name('Load Bulbasaur Object').listen();
	gui.add(options, 'load_city').name('Load City Object').listen();
	gui.add(options, 'load_dragon').name('Load Dragon Object').listen();
	gui.add(options, 'load_gota').name('Load Water Drop').listen();
	gui.add(options, 'stop_rotation').name('Stop Rotation').listen();
	gui.add(options, 'reset_rotation').name('Reset Rotation').listen();	
	gui.add(options, 'wireframe_option').name('Enable/Disable Wireframe').listen().onChange(updateWireframe);
	
	//END OF DAT GUI CONTROL PANEL
	
	
	function animate(){
		requestAnimationFrame(animate);
		sceneGroup.rotation.set(options.rotx + options.velrotx, options.roty + options.velroty, options.rotz + options.velrotz);
		options.rotx = sceneGroup.rotation.x;
		options.roty = sceneGroup.rotation.y;
		options.rotz = sceneGroup.rotation.z;
		//adjust rotation panel 
		function adjust_gui_rotation_panel(){
			if(options.rotx < 2*Math.PI) options.rotx += 2*Math.PI;
			if(options.rotx > 2*Math.PI) options.rotx -= 2*Math.PI;
			if(options.roty < 2*Math.PI) options.roty += 2*Math.PI;
			if(options.roty > 2*Math.PI) options.roty -= 2*Math.PI;
			if(options.rotz < 2*Math.PI) options.rotz += 2*Math.PI;
			if(options.rotz > 2*Math.PI) options.rotz -= 2*Math.PI;
		}
		adjust_gui_rotation_panel();
		
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();
}
