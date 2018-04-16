function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	renderer.setSize(500, 500);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	scene.add(camera);
	
	var cubeGeometry = new THREE.Geometry();
	
	cubeGeometry.vertices.push(new THREE.Vector3( 0.5,  0.5,  0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5,  0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3( 0.5, -0.5,  0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3(-0.5,  0.5,  0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3( 0.5,  0.5, -0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5, -0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3( 0.5, -0.5, -0.5)); 
	cubeGeometry.vertices.push(new THREE.Vector3(-0.5,  0.5, -0.5)); 
	
	cubeGeometry.faces.push(new THREE.Face3(1, 2, 0)); 
	cubeGeometry.faces.push(new THREE.Face3(1, 0, 3)); 
	cubeGeometry.faces[0].materialIndex = 0;
	cubeGeometry.faces[1].materialIndex = 0;

	cubeGeometry.faces.push(new THREE.Face3(5, 4, 6)); 
	cubeGeometry.faces.push(new THREE.Face3(5, 7, 4)); 
	cubeGeometry.faces[2].materialIndex = 1;
	cubeGeometry.faces[3].materialIndex = 1;
	
	cubeGeometry.faces.push(new THREE.Face3(3, 0, 4)); 
	cubeGeometry.faces.push(new THREE.Face3(3, 4, 7)); 
	cubeGeometry.faces[4].materialIndex = 2;
	cubeGeometry.faces[5].materialIndex = 2;
	
	cubeGeometry.faces.push(new THREE.Face3(1, 6, 2)); 
	cubeGeometry.faces.push(new THREE.Face3(1, 5, 6)); 
	cubeGeometry.faces[6].materialIndex = 3;
	cubeGeometry.faces[7].materialIndex = 3;
	
	cubeGeometry.faces.push(new THREE.Face3(2, 6, 4)); 
	cubeGeometry.faces.push(new THREE.Face3(2, 4, 0)); 
	cubeGeometry.faces[8].materialIndex = 4;
	cubeGeometry.faces[9].materialIndex = 4;

	cubeGeometry.faces.push(new THREE.Face3(5, 1, 3)); 
	cubeGeometry.faces.push(new THREE.Face3(5, 3, 7));
	cubeGeometry.faces[10].materialIndex = 5;
	cubeGeometry.faces[11].materialIndex = 5;
	
	var faceMaterials = [new THREE.MeshBasicMaterial({color:0x000099, side: THREE.DoubleSide, wireframe: false}), new THREE.MeshBasicMaterial({color:0xff0000, side: THREE.DoubleSide, wireframe: false}),
											new THREE.MeshBasicMaterial({color:0x009933, side: THREE.DoubleSide, wireframe: false}), new THREE.MeshBasicMaterial({color:0xffff00, side: THREE.DoubleSide, wireframe: false}),
											new THREE.MeshBasicMaterial({color:0xcc00ff, side: THREE.DoubleSide, wireframe: false}), new THREE.MeshBasicMaterial({color:0x663300, side: THREE.DoubleSide, wireframe: false})];

	
	var cubeMaterial = new THREE.MeshFaceMaterial(faceMaterials);
	
	var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
	
	scene.add(cubeMesh);
	
	cubeMesh.rotation.x += 0.3;
	cubeMesh.rotation.y += 0.3;
	
	function animate(){
		requestAnimationFrame(animate);
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();

}
