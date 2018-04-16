function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	var planeGeometry = new THREE.Geometry();
	
	planeGeometry.vertices.push(new THREE.Vector3(-0.5, 0.5, 0));
	planeGeometry.vertices.push(new THREE.Vector3(0.5, 0.5, 0));
	planeGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5, 0));
	planeGeometry.vertices.push(new THREE.Vector3(0.5, -0.5, 0));
	
	planeGeometry.faces.push(new THREE.Face3(1,2,3));
	planeGeometry.faces.push(new THREE.Face3(0,1,2));
	
	planeGeometry.faces[0].vertexColors[0] = new THREE.Color(1.0, 0.0, 0.0);
	planeGeometry.faces[0].vertexColors[1] = new THREE.Color(0.0, 1.0, 0.0);
	planeGeometry.faces[0].vertexColors[2] = new THREE.Color(0.0, 0.0, 1.0);
	planeGeometry.faces[1].vertexColors[0] = new THREE.Color(1.0, 1.0, 0.0);
	planeGeometry.faces[1].vertexColors[1] = new THREE.Color(1.0, 0.0, 0.0);
	planeGeometry.faces[1].vertexColors[2] = new THREE.Color(0.0, 1.0, 0.0);
	
	var planeMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, wireframe:false, side: THREE.DoubleSide});
	
	var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
	
	scene.add(planeMesh);
	
	renderer.clear();
	renderer.render(scene, camera);

}
