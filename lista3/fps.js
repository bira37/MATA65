var scene = null;
var renderer = null;
var player_camera = null;
var map_camera = null;
var back_camera = null;
var clock = null;
var city = null;
var player_map = null;
var box = null;
var player = null;
var camera = null;
var map_point = null;

function loadMesh(loadedMesh) {
	
	loadedMesh.name = "city";
	var material = new THREE.MeshPhongMaterial();
	material.bothsides	= false;
	material.side 		= THREE.FrontSide;
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
	});

	city = loadedMesh;
	scene.add(loadedMesh);
	
	box = new THREE.Box3();
	box.setFromObject(city);
	console.log(box);
	
	map_camera.position.x = (box.min.x + box.max.x)/2;
	map_camera.position.y = 15*box.max.y;
	map_camera.position.z = (box.min.z + box.max.z)/2;
	map_camera.up = new THREE.Vector3(1, 0, 0);
	
	map_point.position.set(map_camera.position.x, 10*box.max.y, map_camera.position.z);
	
	player_camera.position.set((box.min.x + box.max.x)/2 + 15, 1.7, (box.min.z + box.max.z)/2);
	
	player.update();
	
	//Add point light Source
	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(box.max.x*1.5, box.max.y*3.0, box.max.z*1.5);
	var sun_geometry = new THREE.SphereGeometry( 15, 32, 32 );
	var sun_material = new THREE.MeshBasicMaterial( { color: 0xf7c224, wireframe : false } );
	var sun = new THREE.Mesh(sun_geometry, sun_material);
	sun.position.set(box.max.x*1.5, box.max.y*3.0, box.max.z*1.5);
	scene.add(pointLight1);
	scene.add(sun);
	
};

function run(){

  clock = new THREE.Clock();
	
	//initialize scene and renderer
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(0x54aee8);
	renderer.setSize(1200, 600);
	renderer.autoClear = false;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	map_camera = new THREE.PerspectiveCamera(15.0, 12/6, 0.1, 1000.0);
	
	player_camera = new THREE.PerspectiveCamera(60, 4/2, 0.1, 1000.0);
	
	back_camera = new THREE.PerspectiveCamera(60, 4/4, 0.1, 1000.0);
	
	player = new THREE.FirstPersonControls(player_camera, renderer.domElement);
	player.noFly = true;
	
	//creating map point
	var point_geometry = new THREE.SphereGeometry( 1.5, 32, 32 );
	var point_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	map_point = new THREE.Mesh(point_geometry, point_material);
	
	// Load Mesh and add to scene
	var loader = new THREE.OBJLoader();
	loader.load('libs/city.obj', loadMesh);
	
	function render(){
    if(city){
      player.update(clock.getDelta());
      
      //adjust limits
      player_camera.position.x = Math.min(player_camera.position.x, box.max.x);
      player_camera.position.x = Math.max(player_camera.position.x, box.min.x);
      player_camera.position.z = Math.min(player_camera.position.z, box.max.z);
      player_camera.position.z = Math.max(player_camera.position.z, box.min.z);
      
      //update directions
      var player_direction = new THREE.Vector3();
      player_camera.getWorldDirection( player_direction );
      player_direction.multiplyScalar(-1);
      back_camera.position.set(player_camera.position.x, player_camera.position.y, player_camera.position.z);
      player_direction.add(back_camera.position);
      back_camera.lookAt(player_direction);
      player_camera.getWorldDirection( player_direction );
      map_camera.position.set(player_camera.position.x, 15*box.max.y, player_camera.position.z);
      map_camera.lookAt(player_camera.position);
      map_point.position.set(map_camera.position.x, 10*box.max.y, map_camera.position.z);
      
      //render the scene
      renderer.clear();
      scene.add(map_point);
      renderer.setViewport(800, 0, 400, 200);
		  renderer.render(scene, map_camera);
		  scene.remove(map_point);
		  renderer.setViewport(800, 200, 400, 400);
		  renderer.render(scene, back_camera);
		  renderer.setViewport(0, 0, 800, 600);
		  renderer.render(scene, player_camera);
		}
		requestAnimationFrame(render);
	}
	render();
	
}
	
