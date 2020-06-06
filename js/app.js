import * as THREE from 'https://threejs.org/build/three.module.js';
import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';

import {getMouseTravel, setMouseTravel} from "./utils.js";


var scene = new THREE.Scene();


var video = document.getElementById( 'video' );
var vidTexture = new THREE.VideoTexture( video );
var controls;



var clock = new THREE.Clock();

var dirLight, spotLight;
var torusKnot, dirGroup;

var stats = new Stats();
document.body.appendChild( stats.dom );

// var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 100000 );
camera.position.z = -3;
var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); // Create a renderer with Antialiasing

renderer.setClearColor(0x000000, 0);
renderer.shadowMapEnabled = true;


var scrnRectRatio = 0.85
var noiseIndex = 0;

// Configure renderer size
// renderer.setSize( window.innerHeight * 0.7, window.innerHeight * 0.7 );
renderer.setSize( window.innerHeight *scrnRectRatio, window.innerHeight *scrnRectRatio );
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );



var audio = document.getElementById("myAudio"); 
var ambientBed = document.getElementById("ambientBed"); 
var audioAccent = document.getElementById("audioAccent"); 
audioAccent.volume = 0.0; 



controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.enableDamping = true;
// controls.enableRotate = false;



// Create a plane Mesh with basic material
var geometry = new THREE.PlaneGeometry(7, 4, 50, 50);










var texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );


var lgeometry = new THREE.BoxGeometry( 0.25, 0.25, 0.25 );
var lmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var lcube = new THREE.Mesh(lgeometry, lmaterial );
lcube.position.set(1, 0, 2);
// lcube.position.set(light.position.x, light.position.y, light.position.z);
// scene.add( lcube );

var rcube = new THREE.Mesh(lgeometry, lmaterial );
rcube.position.set(1, 0, 2);
// scene.add( rcube );


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


var material = new THREE.MeshStandardMaterial( {

    map: vidTexture,

    displacementMap: texture,
    displacementScale: -4,
    displacementBias:  2, // from original model

    side: THREE.DoubleSide

} );


var paperPlane = new THREE.Mesh( geometry, material );
// paperPlane.rotation.y = Math.PI;
paperPlane.castShadow = true;
paperPlane.receiveShadow  = true;
scene.add( paperPlane );



var thumbnailPlane = new THREE.Mesh( geometry, material );


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

    targetTravel = getMouseTravel() * 1.0;
    targetTravel = targetTravel.toFixed(2)
    dTravel = targetTravel - easedTravel;
    easedTravel += dTravel * easing;


    if(easedTravel * 0.01 <= 0.975){
        audioAccent.volume = easedTravel * 0.01; 

    }


    setMouseTravel(0);


    stats.begin();

    requestAnimationFrame( animate );
    controls.update();


    texture = new THREE.DataTexture( makeNoise(easedTravel * 0.001, noiseIndex), width, height, THREE.RGBFormat );
    material.displacementMap = texture;


            //  var delta = clock.getDelta();
                // var time = clock.elapsedTime;

            //  dirGroup.rotation.z += 0.7 * delta;
                // dirLight.position.z = 17 + Math.sin(time*0.001)*5

    renderer.render(scene, camera);
    stats.end();
}

window.addEventListener( 'resize', onWindowResize, false );









var params = {

    noiseType: 0,
    spheres: true,
    text: true,

    noiseScale: 4.5,
    depth: -4,
    zoom: 2,
    lightIntensity1: 1,
    lightRadius1: 15,
    lightColour1: '#ff4444',
    lightIntensity2: 1,
    lightRadius2: 15,
    lightColour2: '#aaaaff',


    planeY: {

        constant: 0,
        negated: false,
        displayHelper: false

    },
    planeZ: {

        constant: 0,
        negated: false,
        displayHelper: false

    }


};




// GUI
var gui = new GUI({ autoPlace: false });
gui.domElement.id = 'gui';
gui_container.appendChild(gui.domElement);

gui.add(params, 'noiseType', { perlin: 0, simplex: 1, simplex_layered: 2, worly: 3,worly_second: 4, worly_layered: 5 } ).onChange( d => noiseIndex = d );
gui.add( params, 'noiseScale' ).min( 0 ).max( 15 ).onChange( d => scale = d );
gui.add( params, 'depth' ).min( -15 ).max( 15 ).onChange( d => material.displacementScale = d );
gui.add( params, 'zoom' ).min( -10 ).max( 10 ).onChange( d => material.displacementBias = d );
gui.add( params, 'spheres' ).onChange( d => d?document.querySelector("canvas").style.display = "initial":document.querySelector("canvas").style.display = "none"
 );
gui.add( params, 'text' ).onChange( d => d?document.querySelector(".placard").style.display = "initial":document.querySelector(".placard").style.display = "none"
 );
gui.add( params, 'lightIntensity1' ).min( 0 ).max( 8 ).onChange( function(intensityValue) {
     pointLight1.intensity = intensityValue;
     pointLight3.intensity = intensityValue;
});
gui.add( params, 'lightRadius1' ).min( 0 ).max( 30 ).onChange( function(radiusValue) {
     pointLight1.distance = radiusValue;
     pointLight3.distance = radiusValue;
});
gui.addColor(params, 'lightColour1').onChange( function(colorValue) {
     pointLight1.color.set(colorValue);
     pointLight3.color.set(colorValue);
});
gui.add( params, 'lightIntensity2' ).min( 0 ).max( 8 ).onChange( function(intensityValue) {
     pointLight2.intensity = intensityValue;
     pointLight4.intensity = intensityValue;
});
gui.add( params, 'lightRadius2' ).min( 0 ).max( 30 ).onChange( function(radiusValue) {
     pointLight2.distance = radiusValue;
     pointLight4.distance = radiusValue;
});
gui.addColor(params, 'lightColour2').onChange( function(colorValue) {
     pointLight2.color.set(colorValue);
     pointLight4.color.set(colorValue);
});









function onWindowResize(){

    camera.aspect = 1;
    camera.updateProjectionMatrix();

    // renderer.setSize( window.innerHeight * 0.7, window.innerHeight*0.7 );
    renderer.setSize( window.innerHeight *scrnRectRatio, window.innerHeight *scrnRectRatio);


}


