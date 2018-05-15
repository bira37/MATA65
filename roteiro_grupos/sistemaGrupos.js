var scene 		= null;
var renderer	= null;
var camera 		= null;
var earth 		= null;
var moon      = null;
var sun 		= null;
var day 		= 0.0;
var year		= 0.0;
var month		= 0.0;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(700, 700);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );
		
	// Eixo do Sol
	//var sAxis = new THREE.AxisHelper(0.6);

	// Sol
	var grupoSistemaSolar = new THREE.Object3D();
	var sphereGeometry = new THREE.SphereGeometry(0.4, 40, 40);                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
	sun = new THREE.Mesh( sphereGeometry, sphereMat );
	//sun.add(sAxis);
	grupoSistemaSolar.add(sun);
	scene.add(grupoSistemaSolar);	
	
	// Eixo da Terra
	//var tAxis = new THREE.AxisHelper(0.15);

	// Terra
	var grupoTerra = new THREE.Object3D();
	sphereGeometry = new THREE.SphereGeometry( 0.1, 20, 20);                 
	sphereMat = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:true} );
	earth = new THREE.Mesh( sphereGeometry, sphereMat );
	//earth.add(tAxis);
	grupoTerra.add(earth);
	grupoSistemaSolar.add(grupoTerra);	
		
	// Eixo da Lua
	//var lAxis = new THREE.AxisHelper(0.04);

	// Lua
	var grupoLua = new THREE.Object3D();
	sphereGeometry = new THREE.SphereGeometry( 0.03, 10, 10 );                 
	sphereMat = new THREE.MeshBasicMaterial( {color: 0xaaaaaa, wireframe:true} );
	moon = new THREE.Mesh( sphereGeometry, sphereMat );
	//moon.add(lAxis);
	grupoTerra.add(moon);
	
	function render() {
	var m = new THREE.Matrix4();
	
	day 	+= 0.07;
	year 	+= 0.01;
	month 	+= 0.04;
	
	m.identity();
	grupoSistemaSolar.matrix.copy(m);
	m.makeRotationY(year);
	grupoSistemaSolar.applyMatrix(m);
	grupoSistemaSolar.updateMatrix();
	
	m.identity();
	moon.matrix.copy(m);
	m.makeTranslation(0.15,0,0);
	moon.applyMatrix(m);
	m.makeRotationY(day);
	moon.applyMatrix(m);
	moon.updateMatrix();
	
	m.identity();
	grupoTerra.matrix.copy(m);
	m.makeTranslation(0.7, 0, 0);
	grupoTerra.applyMatrix(m);
	m.makeRotationY(year);
	grupoTerra.applyMatrix(m);
	grupoTerra.updateMatrix();
	

	renderer.render(scene, camera);
	
	requestAnimationFrame(render);
}
		
	renderer.clear();
	render();
};

