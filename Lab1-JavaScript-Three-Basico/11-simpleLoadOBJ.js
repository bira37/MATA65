var mesh;
var renderer;
var scene;
var camera;
var BBox;
var maxDim;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -300.0, 300.0, 300.0, -300.0, -300.0, 300.0);
	
	scene.add( camera );
	
	// Load Mesh
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/bunnyExp.obj', loadMesh);

	renderer.clear();
	// Global Axis
	var globalAxis = new THREE.AxesHelper( 5.0 );
	scene.add( globalAxis );
	render();
}

function render() {

	if (mesh) 
		renderer.render(scene, camera);
	else
		requestAnimationFrame(render);	
}

function loadMesh(loadedMesh) {
	var material = new THREE.MeshBasicMaterial({color: 0x2194cf, side: THREE.DoubleSide, vertexColors: THREE.VertexColors, wireframe: true});
	loadedMesh.children.forEach(function (child) {
		child.material = material;
	});
	var max_x = max_y = max_z = -500;
	var min_x = min_y = min_z = 500; 
	var new_geometry = new THREE.Geometry().fromBufferGeometry(loadedMesh.children[0].geometry);
	for(i = 0; i< new_geometry.vertices.length; i++){
		max_x = Math.max(max_x, new_geometry.vertices[i].x);
		min_x = Math.min(min_x, new_geometry.vertices[i].x);
		max_y = Math.max(max_y, new_geometry.vertices[i].y);
		min_y = Math.min(min_y, new_geometry.vertices[i].y);
		max_z = Math.max(max_z, new_geometry.vertices[i].z);
		min_z = Math.min(min_z, new_geometry.vertices[i].z);
	}
	console.log(max_x + " " + max_y + " " + max_z + " " + min_x + " " + min_y + " " + min_z);
	for(i = 0; i<new_geometry.faces.length; i++){
		var a = new_geometry.faces[i].a;
		var b = new_geometry.faces[i].b;
		var c = new_geometry.faces[i].c;
		var c1 = (new_geometry.vertices[a].x - min_x)/(max_x - min_x);
		var c2 = (new_geometry.vertices[a].y - min_y)/(max_y - min_y);
		var c3 = (new_geometry.vertices[a].z - min_z)/(max_z - min_z);
		new_geometry.faces[i].vertexColors[0] = new THREE.Color(c1,c2,c3);
		c1 = (new_geometry.vertices[b].x - min_x)/(max_x - min_x);
		c2 = (new_geometry.vertices[b].y - min_y)/(max_y - min_y);
		c3 = (new_geometry.vertices[b].z - min_z)/(max_z - min_z);
		new_geometry.faces[i].vertexColors[1] = new THREE.Color(c1,c2,c3);
		c1 = (new_geometry.vertices[c].x - min_x)/(max_x - min_x);
		c2 = (new_geometry.vertices[c].y - min_y)/(max_y - min_y);
		c3 = (new_geometry.vertices[c].z - min_z)/(max_z - min_z);
		new_geometry.faces[i].vertexColors[2] = new THREE.Color(c1,c2,c3);
	}
	new_material = new THREE.MeshBasicMaterial({color: 0xffff00, vertexColors: THREE.VertexColors, wireframe: true, side: THREE.DoubleSide});
	mesh = new THREE.Mesh(new_geometry, new_material);
	scene.add(mesh);
};

