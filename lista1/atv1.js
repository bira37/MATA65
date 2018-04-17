
function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(700, 700);
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	var camera = new THREE.OrthographicCamera(-2.0, 2.0, 2.0, -2.0, -2.0, 2.0);
	
	scene.add(camera);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var gotaGeometry = new THREE.Geometry();
	
	for(i=0; i<=2*Math.PI; i+= 2*Math.PI/5){
		for(j = 0; j<Math.PI; j += Math.PI/5){
			var x = 0.5*(1 - Math.cos(j))*Math.sin(j)*Math.cos(i);	
			var y = 0.5*(1 - Math.cos(j))*Math.sin(j)*Math.sin(i);
			var z = Math.cos(j);	
		 	gotaGeometry.vertices.push(new THREE.Vector3(x,y,z));
		}
	}
	
	/*for(i = 0; i<gotaGeometry.vertices.length - 2; i++){
		gotaGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
		gotaGeometry.faces[i].vertexColors[0] = new THREE.Color(0.0, 0.0, 1.0);
		gotaGeometry.faces[i].vertexColors[1] = new THREE.Color(0.0, 0.0, 1.0);
		gotaGeometry.faces[i].vertexColors[2] = new THREE.Color(0.0, 0.0, 1.0);
	}*/
	for(i = 0; i<gotaGeometry.vertices.length; i++){
		for(j = i+1; j<gotaGeometry.vertices.length; j++){
			for(k = j+1; k<gotaGeometry.vertices.length; k++){
				gotaGeometry.faces.push(new THREE.Face3(i, j, k));
			}
		}
	}
	
	var gotaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColor: THREE.VertexColors, wireframe: false});
	
	var gotaMesh = new THREE.Mesh(gotaGeometry, gotaMaterial);
	
	scene.add(gotaMesh);
	
	function animate(){
		requestAnimationFrame(animate);
		gotaMesh.rotation.x += 0.05;
		gotaMesh.rotation.y += 0.05;
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();

}
