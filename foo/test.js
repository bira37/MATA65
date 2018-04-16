// Drawing a emoticon

function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(1.0, 1.0, 1.0));
	renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
	
	var camera = new THREE.OrthographicCamera( -3.0, 3.0, -3.0, 3.0, -3.0, 3.0 );
	
	scene.add(camera);
	
	var geometry1 = new THREE.Geometry();
	
	var geometry2 = new THREE.Geometry();
	
	var geometry3 = new THREE.Geometry();
	
	geometry1.vertices.push(new THREE.Vector3(-0.05, 0.35, 0), new THREE.Vector3(-0.05, 0.25, 0));
	
	geometry2.vertices.push(new THREE.Vector3(-0.04, 0.2, 0), new THREE.Vector3(0.04, 0.2, 0));
	
	geometry3.vertices.push(new THREE.Vector3(0.05, 0.35, 0), new THREE.Vector3(0.05, 0.25, 0));
	
	var material1 = new THREE.LineBasicMaterial({color:0xff0000});
	
	var material2 = new THREE.LineBasicMaterial({color:0xff0000});
	
	var material3 = new THREE.LineBasicMaterial({color:0xff0000});
	
	var line1 = new THREE.Line(geometry1, material1);
	
	var line2 = new THREE.Line(geometry2, material2);
	
	var line3 = new THREE.Line(geometry3, material3);
	
	scene.add(line1);
	scene.add(line2);
	scene.add(line3);

	
	document.getElementById("My_Program").appendChild(renderer.domElement);
	
	renderer.render(scene, camera);

}

	
	
