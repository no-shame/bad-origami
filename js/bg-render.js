import * as THREE from 'https://threejs.org/build/three.module.js';
import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );
camera.position.z = -3;

var renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); // Create a renderer with Antialiasing
renderer.setClearColor(0x000000, 0);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.pointerEvents = "none";

document.body.appendChild( renderer.domElement );

var controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);




//Spheres
var spheres = [];

var sphereGeometry = new THREE.SphereBufferGeometry( 100, 32, 16 );

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

    scene.add( sphereMesh );
    spheres.push( sphereMesh );
}


animate();

function animate() {

    controls.update();
    requestAnimationFrame( animate );
    renderer.render(scene, camera);

    //Move spheres
    var timer = 0.00001 * Date.now();

    for ( var i = 0, il = spheres.length; i < il; i ++ ) {

        var sphere = spheres[ i ];

        sphere.position.x = 5000 * Math.cos( timer + i );
        sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
    }

}


window.addEventListener( 'resize', onWindowResizeBg, false );


function onWindowResizeBg(){
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);

}

