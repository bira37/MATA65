
function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(700, 700);
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	var camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	
	scene.add(camera);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	var gotaGeometry = new THREE.Geometry();
	
	var numVertices = 40;
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
			if(p1 == layer*vcnt-1){
				gotaGeometry.faces.push(new THREE.Face3(p2, layer*vcnt, p1));
				gotaGeometry.faces.push(new THREE.Face3(layer*vcnt, (layer-1)*vcnt, p1));
			}
			else {
				gotaGeometry.faces.push(new THREE.Face3(p2, p2+1, p1));
				gotaGeometry.faces.push(new THREE.Face3(p2+1, p1+1, p1));
			}
		}
	}
	
	
	
	var gotaMaterial = new THREE.MeshBasicMaterial({color: 0x4ddbff, vertexColors: THREE.NoColors, wireframe: true});
	
	var gotaMesh = new THREE.Mesh(gotaGeometry, gotaMaterial);
	
	scene.add(gotaMesh);
	gotaMesh.rotation.x += -1;
	function animate(){
		requestAnimationFrame(animate);
		gotaMesh.rotation.x += 0.005;
		//gotaMesh.rotation.z += 0.005;
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();

}
