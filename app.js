import * as THREE from 'https://threejs.org/build/three.module.js';
import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var video = document.getElementById( 'video' );
var vidTexture = new THREE.VideoTexture( video );
var controls;

var mouseCounter = 0;


var clock = new THREE.Clock();

var dirLight, spotLight;
var torusKnot, dirGroup;

var stats = new Stats();
document.body.appendChild( stats.dom );
var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
camera.position.z = 1;
var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); // Create a renderer with Antialiasing

renderer.setClearColor(0x000000, 0);
renderer.shadowMapEnabled = true;




// Configure renderer size
renderer.setSize( window.innerHeight * 0.7, window.innerHeight * 0.7 );
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );




var audio = document.getElementById("myAudio"); 
var ambientBed = document.getElementById("ambientBed"); 
var audioAccent = document.getElementById("audioAccent"); 
audioAccent.volume = 0.0; 







let moved
let downListener = () => {
    moved = false
}
document.body.addEventListener('mousedown', downListener)
let moveListener = () => {
    moved = true
}
document.body.addEventListener('mousemove', moveListener)
let upListener = () => {
    if (moved) {
        console.log('moved')
    } else {
    		// audio.play(); 
        	texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );
    		material.displacementMap = texture;

    		if(mouseCounter < 12)
    			mouseCounter++;
    		else mouseCounter = 0;

    		if(mouseCounter == 0){
    			document.body.style.background = "white"
    		}
    		if(mouseCounter == 1){
    			document.body.style.background = "black"
    		}
    		if(mouseCounter == 2){
    			document.body.style.background = "lightblue"
    		}
    		if(mouseCounter == 3){
    			document.querySelector("#bgVideo").style.display = "initial";
    			document.querySelector("#bgVideo").src = "video/ocean.mp4";
    			document.querySelector("#bgVideo").play();
    		}
    		if(mouseCounter == 4){
    			document.body.style.background = "black"
    			document.querySelector("#bgVideo").src = "video/road4.mp4";
    			document.querySelector("#bgVideo").play();
    		}
    		if(mouseCounter == 5){
    			document.querySelector("#bgVideo").pause();
    			document.querySelector("#bgVideo").style.display = "none";
    			document.body.style.backgroundImage = "url('video/boxes.gif')"; 
    		}
    		if(mouseCounter == 6){
    			document.body.style.backgroundImage = "url('video/smile.gif')"; 
    			document.body.style.backgroundRepeat= "no-repeat";
    			document.body.style.backgroundSize= "cover";
    		}

    		if(mouseCounter == 7){
    			document.body.style.backgroundImage = "url('video/windows.jpg')"; 
    			    			document.body.style.backgroundRepeat= "no-repeat";
    			document.body.style.backgroundSize= "cover";
    		}
    		if(mouseCounter == 8){
    			document.body.style.backgroundImage = "url('video/windows7.jpg')"; 
    			    			document.body.style.backgroundRepeat= "no-repeat";
    			document.body.style.backgroundSize= "cover";
    		}
    		if(mouseCounter == 9){
    			document.body.style.backgroundImage = "url('video/windows10.jpg')"; 
    			 document.body.style.backgroundRepeat= "no-repeat";
    			document.body.style.backgroundSize= "cover";
    		}

    		if(mouseCounter == 10){
    			document.body.style.backgroundImage = "linear-gradient(#9e9f99, #e9e9e7, #ffffff)"; 
    		}

    		if(mouseCounter == 11){
    			document.body.style.backgroundImage = "linear-gradient(white, lightblue)"; 
    		}


    		console.log(mouseCounter);
    }
}
document.body.addEventListener('mouseup', upListener)

document.body.addEventListener('touchend', function(){
    		// audio.play(); 
        	texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );
    		material.displacementMap = texture;
})

controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.enableDamping = true;



// Create a plane Mesh with basic material
var geometry = new THREE.PlaneGeometry(7, 4, 50, 50);

var texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );


// var material = new THREE.MeshBasicMaterial( { map: vidTexture, side: THREE.DoubleSide } );

// var light = new THREE.AmbientLight( 0xFF9999 ); // soft white light
// scene.add( light );








// var light = new THREE.PointLight( 0xffffff, 1, 300 );
// light.position.set( -2.5, 3, 4.5 );
// light.castShadow = true;
// light.shadowBias = 0.1009;
// scene.add( light );

// var light2 = new THREE.PointLight( 0xff0000, 2, 300 );
// light2.position.set( 3, 3, 0 );
// scene.add( light2 );

var lgeometry = new THREE.BoxGeometry( 0.25, 0.25, 0.25 );
var lmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var lcube = new THREE.Mesh(lgeometry, lmaterial );
lcube.position.set(1, 0, 2);
// lcube.position.set(light.position.x, light.position.y, light.position.z);
scene.add( lcube );

var rcube = new THREE.Mesh(lgeometry, lmaterial );
rcube.position.set(1, 0, 2);
scene.add( rcube );


var pointLight1 = new THREE.PointLight( 0xff4444, 1, 15 );
pointLight1.position.set( -2, 0, 2 );
scene.add( pointLight1 );

var pointLight2 = new THREE.PointLight( 0xaaaaff, 1, 15 );
pointLight2.position.set( 2, 0, 2 );
scene.add( pointLight2 );

var pointLight3 = new THREE.PointLight( 0xff4444, 1, 15 );
pointLight1.position.set( -2, 0, -7 );
scene.add( pointLight3 );

var pointLight4 = new THREE.PointLight( 0xaaaaff, 1, 15 );
pointLight2.position.set( 2, 0, -7 );
scene.add( pointLight4 );






				// spotLight = new THREE.SpotLight( 0x888888 );
				// spotLight.name = 'Spot Light';
				// spotLight.angle = Math.PI / 5;
				// spotLight.penumbra = 0.3;
				// spotLight.position.set( 8, 10, 5 );
				// spotLight.castShadow = true;
				// spotLight.shadow.camera.near = 8;
				// spotLight.shadow.camera.far = 200;
				// spotLight.shadow.mapSize.width = 256;
				// spotLight.shadow.mapSize.height = 256;
				// spotLight.shadow.bias = -0.002;
				// spotLight.shadow.radius = 4;
				// // scene.add( spotLight );


				// dirLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
				// dirLight.name = 'Dir. Light';
				// dirLight.position.set( 3, 12, 17 );
				// dirLight.castShadow = true;
				// dirLight.shadow.camera.near = 0.1;
				// dirLight.shadow.camera.far = 500;
				// dirLight.shadow.camera.right = 17;
				// dirLight.shadow.camera.left = - 17;
				// dirLight.shadow.camera.top	= 17;
				// dirLight.shadow.camera.bottom = - 17;
				// dirLight.shadow.mapSize.width = 512;
				// dirLight.shadow.mapSize.height = 512;
				// dirLight.shadow.radius = 4;
				// dirLight.shadow.bias = -0.0005;
				// scene.add( dirLight );

				// dirGroup = new THREE.Group();
				// dirGroup.add( dirLight );
				// scene.add( dirGroup );









var material = new THREE.MeshStandardMaterial( {


	map: vidTexture,

	displacementMap: texture,
	displacementScale: -7.5,
	displacementBias:  2.9, // from original model

	side: THREE.DoubleSide

} );


var paperPlane = new THREE.Mesh( geometry, material );
paperPlane.rotation.y = Math.PI;
paperPlane.castShadow = true;
paperPlane.receiveShadow  = true;
scene.add( paperPlane );


if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
	var constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };
	navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

		// apply the stream to the video element used in the texture

		video.srcObject = stream;
		video.play();

	} ).catch( function ( error ) {

		console.error( 'Unable to access the camera/webcam.', error );

	} );

} else {
	console.error( 'MediaDevices interface not available.' );
}





//mouse speed
 var mrefreshinterval = 500; // update display every 500ms
 var lastmousex=-1; 
 var lastmousey=-1;
 var lastmousetime;
 var mousetravel = 0;
 $('html').mousemove(function(e) {
 	 
 	 ambientBed.play();
 	 audioAccent.play();
 	
     var mousex = e.pageX;
     var mousey = e.pageY;
     if (lastmousex > -1)
         mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
     lastmousex = mousex;
     lastmousey = mousey;

     // console.log(mousetravel);
 });






var easing = 0.1;
var targetTravel = 0.0;
var dTravel = 0.0;
var easedTravel = 0.0;

animate();

function animate() {

	// console.log(easedTravel.toFixed(2));

	
	var delta = clock.getDelta();
	var time = clock.elapsedTime * 2;


	lcube.position.x = Math.sin(time)*3;
	lcube.position.y = Math.cos(time)*3;
	pointLight1.position.set(lcube.position.x, lcube.position.y, lcube.position.z);
	pointLight3.position.set(lcube.position.x, lcube.position.y, -7);

	rcube.position.x = Math.sin(time - Math.PI)*3;
	rcube.position.y = Math.cos(time - Math.PI)*3;
	pointLight2.position.set(rcube.position.x, rcube.position.y, rcube.position.z);
	pointLight4.position.set(rcube.position.x, rcube.position.y, -7);

	targetTravel = mousetravel * 1.0;
	targetTravel = targetTravel.toFixed(2)
	dTravel = targetTravel - easedTravel;
	easedTravel += dTravel * easing;


	if(easedTravel * 0.01 <= 0.975)
		audioAccent.volume = easedTravel * 0.01; 


	mousetravel = 0;

	stats.begin();

	requestAnimationFrame( animate );
	controls.update();


	texture = new THREE.DataTexture( makeNoise(easedTravel * 0.001), width, height, THREE.RGBFormat );
    material.displacementMap = texture;


 			// 	var delta = clock.getDelta();
				// var time = clock.elapsedTime;

 			// 	dirGroup.rotation.z += 0.7 * delta;
				// dirLight.position.z = 17 + Math.sin(time*0.001)*5;

    renderer.render(scene, camera);
    stats.end();
}

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize(){

    camera.aspect = 1;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerHeight * 0.7, window.innerHeight*0.7 );

}




