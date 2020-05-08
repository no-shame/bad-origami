import * as THREE from 'https://threejs.org/build/three.module.js';
import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();

var video = document.getElementById( 'video' );

var vidTexture = new THREE.VideoTexture( video );


var controls;

var stats = new Stats();
document.body.appendChild( stats.dom );


var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;


// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setClearColor("#FFFFFF");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );



// Append Renderer to DOM
document.body.appendChild( renderer.domElement );


var audio = document.getElementById("myAudio"); 

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
    		audio.play(); 
        	texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );
    		material.displacementMap = texture;
    }
}
document.body.addEventListener('mouseup', upListener)


document.body.addEventListener('touchend', function(){
    		audio.play(); 
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

var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
scene.add( light );






var material = new THREE.MeshStandardMaterial( {

	map: vidTexture,

	displacementMap: texture,
	displacementScale: -5,
	displacementBias:  1.728408, // from original model

	side: THREE.DoubleSide

} );





var paperPlane = new THREE.Mesh( geometry, material );
paperPlane.rotation.y = Math.PI;
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



animate();

function animate() {
	stats.begin();


	requestAnimationFrame( animate );
	controls.update();
	// texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );
 //    material.displacementMap = texture;
    renderer.render(scene, camera);
    stats.end();

}
