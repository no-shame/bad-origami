import * as THREE from 'https://threejs.org/build/three.module.js';
import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

import {getMouseTravel, setMouseTravel} from "./utils.js";




//Spheres
var spheres = [];
var scene2 = new THREE.Scene();

var camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );
camera2.position.z = -3;



var renderer2 = new THREE.WebGLRenderer({antialias:true, alpha:true}); // Create a renderer with Antialiasing
renderer2.setClearColor(0x000000, 0);
renderer2.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer2.domElement );


var controls2 = new OrbitControls( camera2, renderer2.domElement );
controls2.enableZoom = false;
controls2.enableDamping = true;
controls2.autoRotate = true;
controls2.autoRotateSpeed = 0.5;



var sphereGeometry = new THREE.SphereBufferGeometry( 100, 32, 16 );

// var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background, refractionRatio: 0.95 } );
// sphereMaterial.envMap.mapping = THREE.CubeRefractionMapping;



var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene2.add(light);

var sphereMaterial = new THREE.MeshPhongMaterial( {
        color: 0xFFFFFF,
        shininess: 0,
        specular: 0x222222,
        emissive: 0x555555
    } );

for ( var i = 0; i < 125; i ++ ) {

    var sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );


    // sphereMesh.castShadow = true;
    // sphereMesh.receiveShadow = true;

    sphereMesh.position.x = Math.random() * 10000 - 5000;
    sphereMesh.position.y = Math.random() * 10000 - 5000;
    sphereMesh.position.z = Math.random() * 10000 - 5000;

    sphereMesh.scale.x = sphereMesh.scale.y = sphereMesh.scale.z = Math.random() * 3 + 1;

    scene2.add( sphereMesh );

    spheres.push( sphereMesh );

}



animate2();

function animate2() {

    controls2.update();

    requestAnimationFrame( animate2 );
    renderer2.render(scene2, camera2);
}


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


var scrnRectRatio = 0.8


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
controls.enableRotate = false;



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
    displacementBias:  1, // from original model

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


    texture = new THREE.DataTexture( makeNoise(easedTravel * 0.001), width, height, THREE.RGBFormat );
    material.displacementMap = texture;


            //  var delta = clock.getDelta();
                // var time = clock.elapsedTime;

            //  dirGroup.rotation.z += 0.7 * delta;
                // dirLight.position.z = 17 + Math.sin(time*0.001)*5




    //Move spheres
    var timer = 0.00001 * Date.now();

    for ( var i = 0, il = spheres.length; i < il; i ++ ) {

        var sphere = spheres[ i ];

        sphere.position.x = 5000 * Math.cos( timer + i );
        sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

    }



    renderer.render(scene, camera);

    stats.end();
}

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize(){

    camera.aspect = 1;
    camera.updateProjectionMatrix();

    // renderer.setSize( window.innerHeight * 0.7, window.innerHeight*0.7 );
    renderer.setSize( window.innerHeight *scrnRectRatio, window.innerHeight *scrnRectRatio);


}











// ************************ Drag and drop/ make different module ***************** //
let dropArea = document.body;

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  files.forEach(previewFile)
}

var bgVideo = document.querySelector('#bgVideo');


function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {

    if(!file.type.includes("video")){
        
        bgVideo.style.display = "none";
        document.body.style.background = "white";
        document.body.style.backgroundImage = 'url(' + reader.result + ')';
        document.body.style.backgroundRepeat= "no-repeat";
        document.body.style.backgroundSize= "cover";
    }else{
        bgVideo.style.display = "initial";
        // bgVideo.attr("src",reader.result);
        bgVideo.src = window.URL.createObjectURL(file);
    }
    
  }
}

