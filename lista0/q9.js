function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	renderer.setSize(500, 500);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	var tetrahedronGeometry = new THREE.Geometry();
	
	tetrahedronGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.5));
	tetrahedronGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5, 0.0));
	tetrahedronGeometry.vertices.push(new THREE.Vector3(0.5, -0.5, 0.0));
	tetrahedronGeometry.vertices.push(new THREE.Vector3(0.0, 0.5, 0.0));
	
	tetrahedronGeometry.faces.push(new THREE.Face3(0, 1, 2));
	tetrahedronGeometry.faces.push(new THREE.Face3(0, 2, 3));
	tetrahedronGeometry.faces.push(new THREE.Face3(0, 3, 1));
	tetrahedronGeometry.faces.push(new THREE.Face3(1, 2, 3));
	
	tetrahedronGeometry.faces[0].materialIndex = 0;
	tetrahedronGeometry.faces[1].materialIndex = 1;
	tetrahedronGeometry.faces[2].materialIndex = 2;
	tetrahedronGeometry.faces[3].materialIndex = 3;
	
	var faceMaterials = [new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide, wireframe: false}), new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide, wireframe: false}),
											new THREE.MeshBasicMaterial({color: 0x009933, side: THREE.DoubleSide, wireframe: false}), new THREE.MeshBasicMaterial({color: 0xcc00cc, side: THREE.DoubleSide, wireframe: false})];
											
	var tetrahedronMaterial = new THREE.MeshFaceMaterial(faceMaterials);
	
	var tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
	
	scene.add(tetrahedronMesh);

	var rotCount = 0;
	function animate(){
		requestAnimationFrame(animate);
		if(rotCount < 50) tetrahedronMesh.rotation.x += 0.02;
		else if(rotCount >= 50 && rotCount < 100) tetrahedronMesh.rotation.y += 0.01;
		else if(rotCount >= 100 && rotCount < 150) tetrahedronMesh.rotation.z += 0.02;
		rotCount = (rotCount+1)%150;
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();

}
