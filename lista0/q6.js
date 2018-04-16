function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	renderer.setSize(500, 500);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0 , -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	var ringGeometry = new THREE.Geometry();
	
	for(i=0; i<2*Math.PI; i+=2*Math.PI/100){
		var x = 0.9*Math.cos(i);
		var y = 0.9*Math.sin(i);
		
		ringGeometry.vertices.push(new THREE.Vector3(x, y, 0.0));
		
	}
	
	for(i=2*Math.PI/200; i<2*Math.PI; i+=2*Math.PI/100){
		var x = 0.75*Math.cos(i);
		var y = 0.75*Math.sin(i);
		
		ringGeometry.vertices.push(new THREE.Vector3(x, y, 0.0));
		
	}
	
	var faceCount = 0;
	
	for(i = 0; i<100; i++){
		if(i < 99) ringGeometry.faces.push(new THREE.Face3(i, i+1, i+101));
		else ringGeometry.faces.push(new THREE.Face3(i, 0, 200));
		ringGeometry.faces[faceCount].vertexColors[0] = new THREE.Color(1.0, 0.0, 0.0);
		ringGeometry.faces[faceCount].vertexColors[1] = new THREE.Color(1.0, 0.0, 0.0);	
		ringGeometry.faces[faceCount].vertexColors[2] = new THREE.Color(1.0, 0.0, 0.0);
		
		faceCount++;
		if(i < 99) ringGeometry.faces.push(new THREE.Face3(i+101, i+101+1, i+1));
		else ringGeometry.faces.push(new THREE.Face3(i+101, 101, 0));
		ringGeometry.faces[faceCount].vertexColors[0] = new THREE.Color(1.0, 0.0, 0.0);
		ringGeometry.faces[faceCount].vertexColors[1] = new THREE.Color(1.0, 0.0, 0.0);	
		ringGeometry.faces[faceCount].vertexColors[2] = new THREE.Color(1.0, 0.0, 0.0);
		
		faceCount++;
	}
	
	var ringMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors, side: THREE.DoubleSide, wireframe:true});
	
	var ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
	
	scene.add(ringMesh);
			
	renderer.clear();
	renderer.render(scene, camera);

}
