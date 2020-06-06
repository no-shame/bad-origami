import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';

var gui = new GUI({ autoPlace: false });
gui.domElement.id = 'gui';
gui_container.appendChild(gui.domElement);
gui.add(params, 'noiseType', { voronoi: 0, worly: 1, simplex: 2 } );
gui.add( params, 'noiseScale' ).min( 0 ).max( 15 ).onChange( d => scale = d );
gui.add( params, 'depth' ).min( -15 ).max( 15 ).onChange( d => material.displacementScale = d );
gui.add( params, 'zoom' ).min( -5 ).max( 5 ).onChange( d => material.displacementBias = d );
gui.add( params, 'spheres' ).onChange( d => d?document.querySelector("canvas").style.display = "initial":document.querySelector("canvas").style.display = "none"
 );
gui.add( params, 'text' ).onChange( d => d?document.querySelector(".placard").style.display = "initial":document.querySelector(".placard").style.display = "none"
 );
gui.addColor(params, 'lightColour').onChange( function(colorValue) {
    // obj.material.color.set(colorValue);
});