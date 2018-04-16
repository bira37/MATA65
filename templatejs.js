function run(){
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	
	//write here
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	function animate(){
		requestAnimationFrame(animate);
		renderer.clear();
		renderer.render(scene, camera);
	}
			
	animate();

}
