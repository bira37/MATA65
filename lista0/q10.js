function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	renderer.setSize(500, 500);
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	var cylinderGeometry = new THREE.Geometry();
	
	for(i=0; i<2*Math.PI; i+=2*Math.PI/100){
		var x = 0.3*Math.cos(i);
		var y = 0.3*Math.sin(i);
		
		cylinderGeometry.vertices.push(new THREE.Vector3(x, y, 0.0));
		
	}
	
	for(i=2*Math.PI/200; i<2*Math.PI; i+=2*Math.PI/100){
		var x = 0.3*Math.cos(i);
		var y = 0.3*Math.sin(i);
		
		cylinderGeometry.vertices.push(new THREE.Vector3(x, y, 0.9));
		
	}
	
	var faceCount = 0;
	
	for(i = 0; i<100; i++){
		if(i < 99) cylinderGeometry.faces.push(new THREE.Face3(i, i+1, i+101));
		else cylinderGeometry.faces.push(new THREE.Face3(i, 0, 200));
		//cylinderGeometry.faces[faceCount].vertexColors[0] = new THREE.Color(1.0, 0.0, 0.0);
		//cylinderGeometry.faces[faceCount].vertexColors[1] = new THREE.Color(1.0, 0.0, 0.0);	
		//cylinderGeometry.faces[faceCount].vertexColors[2] = new THREE.Color(1.0, 0.0, 0.0);
		
		faceCount++;
		if(i < 99) cylinderGeometry.faces.push(new THREE.Face3(i+101, i+101+1, i+1));
		else cylinderGeometry.faces.push(new THREE.Face3(i+101, 101, 0));
		//cylinderGeometry.faces[faceCount].vertexColors[0] = new THREE.Color(1.0, 0.0, 0.0);
		//cylinderGeometry.faces[faceCount].vertexColors[1] = new THREE.Color(1.0, 0.0, 0.0);	
		//cylinderGeometry.faces[faceCount].vertexColors[2] = new THREE.Color(1.0, 0.0, 0.0);
		
		faceCount++;
	}
	
	cylinderGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
	
	cylinderGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.9));
	
	for(i = 0; i<100; i++){
		cylinderGeometry.faces.push(new THREE.Face3(203, i, i+1));
	}
	cylinderGeometry.faces.push(new THREE.Face3(203, 100, 0));
	
	for(i = 101; i<201; i++){
		cylinderGeometry.faces.push(new THREE.Face3(202, i, i+1));
	}
	cylinderGeometry.faces.push(new THREE.Face3(202, 201, 101));
	
	var cylinderMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, color: 0x33cc33, side: THREE.DoubleSide, wireframe:true});
	
	var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	
	scene.add(cylinderMesh);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	function animate(){
		requestAnimationFrame(animate);
		cylinderMesh.rotation.x += 0.03;
		cylinderMesh.rotation.y += 0.03;
		cylinderMesh.rotation.z += 0.03;
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();

}
