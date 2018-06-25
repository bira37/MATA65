var scene = null;
var renderer = null;
var camera = null;
var color_texture = null;
var gray_texture = null;
var eq_color_texture = null;
var eq_gray_texture = null;
var plane_geometry = null;
var color_image = null;
var gray_image = null;
var eq_color_image = null;
var eq_gray_image = null;
var color_material = null;
var gray_material = null;
var eq_color_material = null;
var eq_gray_material = null;
var colordata = null;
var graydata = null;
var gray_histogram = [];
var eq_gray_histogram = [];
var eq_color_histogram = [];
var color_histogram = [];
var flag1 = false;
var flag2 = false;

function getImageData( image ) {
    var canvas = document.createElement( 'canvas' );
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext( '2d' );
    context.drawImage( image, 0, 0 );
    return context.getImageData( 0, 0, image.width, image.height );
}

function getPixel( imagedata, x, y ) {
    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
}

function createGrayHistogram(texture){
  graydata = getImageData(texture.image);
  var hist = []
  
  //calculate gray histogram
  for(let i=0; i<256; i++) hist[i] = 0;
  for(let i=0; i<256; i++){
    for(let j=0; j<256; j++){
      hist[getPixel(graydata, i, j).r]++;
    }
  }
  
  //normalize gray histogram
  let sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[i];
  }
  for(let i = 0; i<256; i++){
    hist[i] /= sum;
  }
  
  //creating gray histogram
  let menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[i]);
    maior = Math.max(maior, hist[i]);
  }
  gray_histogram = [];
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100*(hist[i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0x808080 } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    gray_histogram[i] = new THREE.Line(geometry, material);
  }
  
  //creating equalized gray texture
  for(let i = 1; i<256; i++) hist[i] += hist[i-1];
  var data = new Uint8Array(4*256*256);
  for(let i = 0; i < 256; i++){
    for(let j = 0; j < 256; j++){
      let color = Math.floor(255*hist[getPixel(graydata,i,j).r]);
      let pos = ( i + graydata.width * j ) * 4;
      data[pos] = color;
      data[pos+1] = color;
      data[pos+2] = color;
      data[pos+3] = 255;
    }
  }
  
  //calculating equalized gray histogram
  for(let i=0; i<256; i++) hist[i] = 0;
  for(let i=0; i<256; i++){
    for(let j=0; j<256; j++){
      let pos = ( i + graydata.width * j ) * 4; 
      hist[data[pos]]++;
    }
  }
  
  //creating equalized gray histogram
  menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[i]);
    maior = Math.max(maior, hist[i]);
  }
  eq_gray_histogram = [];
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100*(hist[i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0x808080 } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    eq_gray_histogram[i] = new THREE.Line(geometry, material);
  }
  
  
  eq_gray_texture = new THREE.DataTexture(data, graydata.width, graydata.height, THREE.RGBAFormat);
  eq_gray_texture.needsUpdate = true;
  eq_gray_texture.flipY = true;
	gray_material = new THREE.MeshBasicMaterial({map: texture});
	gray_image = new THREE.Mesh(plane_geometry, gray_material);
	eq_gray_material = new THREE.MeshBasicMaterial({map: eq_gray_texture});
	eq_gray_image = new THREE.Mesh(plane_geometry, eq_gray_material);
	
	flag1 = true;
	
}

function createColorHistogram(texture){
  colordata = getImageData(texture.image);
  
  var hist = [];
  for(let i=0; i<3*256; i++) hist[i] = 0;
  for(let i=0; i<256; i++){
    for(let j=0; j<256; j++){
      hist[0*256 + getPixel(colordata, i, j).r]++;
      hist[1*256 + getPixel(colordata, i, j).g]++;
      hist[2*256 + getPixel(colordata, i, j).b]++;
    }
  }
  color_histogram = []
  
  //red channel
  let sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[i];
  }
  for(let i = 0; i<256; i++){
    hist[i] /= sum;
  }
  
  let menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[i]);
    maior = Math.max(maior, hist[i]);
  }
  
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100.0*(hist[i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    color_histogram[i] = new THREE.Line(geometry, material);
  }
  for(let i = 1; i<256; i++) hist[i] += hist[i-1];
  //green channel
  sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[256*1 + i];
  }
  for(let i = 0; i<256; i++){
    hist[256*1 + i] /= sum;
  }
  
  menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[256*1 + i]);
    maior = Math.max(maior, hist[256*1 + i]);
  }
  
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100.0*(hist[256*1 + i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0x008000 } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    color_histogram[256*1 + i] = new THREE.Line(geometry, material);
  }
  for(let i = 1; i<256; i++) hist[256*1 + i] += hist[256*1 + i-1];
  //blue channel
  sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[256*2 + i];
  }
  for(let i = 0; i<256; i++){
    hist[256*2 + i] /= sum;
  }
  
  menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[256*2 + i]);
    maior = Math.max(maior, hist[256*2 + i]);
  }
  
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100.0*(hist[256*2 + i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    color_histogram[256*2 + i] = new THREE.Line(geometry, material);
  }
  for(let i = 1; i<256; i++) hist[256*2 + i] += hist[256*2 + i-1];
  //creating equalized color image
  var data = new Uint8Array(4*256*256);
  for(let i = 0; i < 256; i++){
    for(let j = 0; j < 256; j++){
      let r_color = Math.floor(255*hist[getPixel(colordata,i,j).r]);
      let g_color = Math.floor(255*hist[256 + getPixel(colordata,i,j).g]);
      let b_color = Math.floor(255*hist[256*2 + getPixel(colordata,i,j).b]);
      let pos = ( i + colordata.width * j ) * 4;
      data[pos] = r_color;
      data[pos+1] = g_color;
      data[pos+2] = b_color;
      data[pos+3] = 255;
    }
  }
  
  var hist = [];
  for(let i=0; i<3*256; i++) hist[i] = 0;
  for(let i=0; i<256; i++){
    for(let j=0; j<256; j++){
      let pos = ( i + colordata.width * j ) * 4;
      hist[0*256 + data[pos]]++;
      hist[1*256 + data[pos+1]]++;
      hist[2*256 + data[pos+2]]++;
    }
  }
  eq_color_histogram = []
  
  //equalized red channel
   sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[i];
  }
  for(let i = 0; i<256; i++){
    hist[i] /= sum;
  }
  
  menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[i]);
    maior = Math.max(maior, hist[i]);
  }
  
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100.0*(hist[i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    eq_color_histogram[i] = new THREE.Line(geometry, material);
  }
  for(let i = 1; i<256; i++) hist[i] += hist[i-1];
  //equalized green channel
  sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[256*1 + i];
  }
  for(let i = 0; i<256; i++){
    hist[256*1 + i] /= sum;
  }
  
  menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[256*1 + i]);
    maior = Math.max(maior, hist[256*1 + i]);
  }
  
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100.0*(hist[256*1 + i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0x008000 } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    eq_color_histogram[256*1 + i] = new THREE.Line(geometry, material);
  }
  for(let i = 1; i<256; i++) hist[256*1 + i] += hist[256*1 + i-1];
  //equalized blue channel
  sum = 0.0;
  for(let i = 0; i<256; i++){
    sum += hist[256*2 + i];
  }
  for(let i = 0; i<256; i++){
    hist[256*2 + i] /= sum;
  }
  
  menor = 256.0, maior = 0.0;
  for(let i=0; i<256; i++){
    menor = Math.min(menor, hist[256*2 + i]);
    maior = Math.max(maior, hist[256*2 + i]);
  }
  
  for(let i = 0; i < 256; i++){
    let posx = i*100.0/256.0;
    let posy = 100.0*(hist[256*2 + i] - menor)/(maior - menor);
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } ); 
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(posx, 0, 0));
    geometry.vertices.push(new THREE.Vector3(posx, posy, 0));
    eq_color_histogram[256*2 + i] = new THREE.Line(geometry, material);
  }
  
  eq_color_texture = new THREE.DataTexture(data, colordata.width, colordata.height, THREE.RGBAFormat);
  eq_color_texture.needsUpdate = true;
  eq_color_texture.flipY = true;
  color_material = new THREE.MeshBasicMaterial({map: color_texture});
	eq_color_material = new THREE.MeshBasicMaterial({map: eq_color_texture});
	color_image = new THREE.Mesh(plane_geometry, color_material);
	eq_color_image = new THREE.Mesh(plane_geometry, eq_color_material);
	
	flag2 = true;
}
  
function run(){
  //initialize scene and renderer
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(0);
	renderer.setSize(5*256 + 32, 2*256 +128);
	renderer.autoClear = false;
  renderer.clear();
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	camera = new THREE.OrthographicCamera(0, 100, 100, 0, -1, 1);
	  
	scene.add(camera);
	
	plane_geometry = new THREE.PlaneGeometry(100, 100);
	plane_geometry.translate(50, 50, 0);
	
	color_texture = new THREE.TextureLoader().load( 'images/color.jpg', createColorHistogram );
	gray_texture = new THREE.TextureLoader().load( 'images/grayscale.jpg', createGrayHistogram );
	
	function render(){
	  if(flag1 && flag2){ 
	    //include gray image
      renderer.setViewport(512+256 + 16,0, 256,256);
      scene.add(gray_image);
      renderer.render(scene, camera);
      scene.remove(gray_image);
      
      //include gray histogram
      renderer.setViewport(512+256 + 16, 256, 256, 128);
      for(let i=0; i<256; i++) scene.add(gray_histogram[i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(gray_histogram[i]);
      
      //include equalized gray image
      renderer.setViewport(512+512 + 32, 0, 256, 256);
      scene.add(eq_gray_image);
      renderer.render(scene, camera);
      scene.remove(eq_gray_image);
      
      //include equalized gray histogram
      renderer.setViewport(512+512 + 32, 256, 256, 128);
      for(let i=0; i<256; i++) scene.add(eq_gray_histogram[i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(eq_gray_histogram[i]);
      
      //include color image
	    renderer.setViewport(0,0, 256,256);
      scene.add(color_image);
      renderer.render(scene, camera);
      scene.remove(color_image);
      
      //include red histogram
      renderer.setViewport(0, 256, 256, 128);
      for(let i=0; i<256; i++) scene.add(color_histogram[i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(color_histogram[i]);
      //include green histogram
      renderer.setViewport(0, 256+128, 256, 128);
      for(let i=0; i<256; i++) scene.add(color_histogram[256*1 + i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(color_histogram[256*1 + i]);
      //include blue histogram
      renderer.setViewport(0, 256+256, 256, 128);
      for(let i=0; i<256; i++) scene.add(color_histogram[256*2 + i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(color_histogram[256*2 + i]);
      
      //include equalized color image
      renderer.setViewport(256 + 16, 0, 256, 256);
      scene.add(eq_color_image);
      renderer.render(scene, camera);
      scene.remove(eq_color_image);
      
      //include equalized red histogram
      renderer.setViewport(256 + 16, 256, 256, 128);
      for(let i=0; i<256; i++) scene.add(eq_color_histogram[i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(eq_color_histogram[i]);
      //include equalized green histogram
      renderer.setViewport(256 + 16, 256 + 128, 256, 128);
      for(let i=0; i<256; i++) scene.add(eq_color_histogram[256*1 + i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(eq_color_histogram[256*1 + i]);
      //include equalized blue histogram
      renderer.setViewport(256 + 16, 256 + 256, 256, 128);
      for(let i=0; i<256; i++) scene.add(eq_color_histogram[256*2 + i]);
      renderer.render(scene, camera);
      for(let i=0; i<256; i++) scene.remove(eq_color_histogram[256*2 + i]);
    }
    else requestAnimationFrame(render);
  }
  render();
}
