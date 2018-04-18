var gotaMesh;

function buildGeometry(numVertices){
	var gotaGeometry = new THREE.Geometry();
	var vcnt = 0;
	var layer = -1;
	for(it=0; it<=numVertices; it++){
		var i = it*Math.PI/numVertices;
		var z = Math.cos(i);
		layer++;
		for(it2 = 0; it2<=numVertices; it2++){
			if(it == 0) vcnt++;
			var j = (it2%numVertices)*2*Math.PI/numVertices;
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

function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(700, 700);
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var gotaGeometry = new THREE.Geometry();
	
	var numVertices = 30;
	var vcnt = 0;
	var layer = -1;
	for(it=0; it<=numVertices; it++){
		var i = it*Math.PI/numVertices;
		var z = Math.cos(i);
		layer++;
		for(it2 = 0; it2<=numVertices; it2++){
			if(it == 0) vcnt++;
			var j = (it2%numVertices)*2*Math.PI/numVertices;
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
	
	var gotaMaterial = new THREE.MeshBasicMaterial({color: 5102591, vertexColors: THREE.NoColors, wireframe: true});
	
	var gotaMesh = new THREE.Mesh(gotaGeometry, gotaMaterial);
	
	scene.add(gotaMesh);
	gotaMesh.rotation.x -= Math.PI/2;
	
	//DAT GUI
	
	var options = {
		velrotx: 0,
		velroty: 0,
		velrotz: 0,
		
		stop_rotation: function(){
			this.velrotx = 0;
			this.velroty = 0;
			this.velrotz = 0;
		},
		
		reset_rotation: function(){
			gotaMesh.rotation.x = 2*Math.PI - Math.PI/2;
			gotaMesh.rotation.y = 0;
			gotaMesh.rotation.z = 0;
		}
	}

	var gui = new dat.GUI();
	
	var gui_rotation = gui.addFolder('Rotation');
	gui_rotation.add(gotaMesh.rotation, 'x', 0, 2*Math.PI).step(0.001).name('X').listen();
	gui_rotation.add(gotaMesh.rotation, 'y', 0, 2*Math.PI).step(0.001).name('Y').listen();
	gui_rotation.add(gotaMesh.rotation, 'z', 0, 2*Math.PI).step(0.001).name('Z').listen();
	gui_rotation.open();
	
	var gui_animated_rotation = gui.addFolder('Animated Rotation');
	gui_animated_rotation.add(options, 'velrotx', -0.1, 0.1).step(0.001).name('X').listen();
	gui_animated_rotation.add(options, 'velroty', -0.1, 0.1).step(0.001).name('Y').listen();
	gui_animated_rotation.add(options, 'velrotz', -0.1, 0.1).step(0.001).name('Z').listen();
	gui_animated_rotation.open();
	
	gui.add(options, 'stop_rotation').name('Stop Rotation').listen();
	gui.add(options, 'reset_rotation').name('Reset Rotation').listen();	
	gui.add(gotaMaterial, 'wireframe').name('Enable/Disable Wireframe').listen();
	
	
	function animate(){
		requestAnimationFrame(animate);
		gotaMesh.rotation.x += options.velrotx;
		gotaMesh.rotation.y += options.velroty;
		gotaMesh.rotation.z += options.velrotz;
		
		//adjust panel
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
