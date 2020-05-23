import * as THREE from 'https://threejs.org/build/three.module.js';


// var mouseCounter = 0;

// let moved
// let downListener = () => {
//     moved = false
// }
// document.body.addEventListener('mousedown', downListener)
// let moveListener = () => {
//     moved = true
// }
// document.body.addEventListener('mousemove', moveListener)
// let upListener = () => {
//     if (moved) {
//         console.log('moved')
//     } else {

//     		if(mouseCounter < 12)
//     			mouseCounter++;
//     		else mouseCounter = 0;

//     		if(mouseCounter == 0){
//     			document.body.style.background = "white"
//     		}
//     		if(mouseCounter == 1){
//     			document.body.style.background = "black"
//     		}
//     		if(mouseCounter == 2){
//     			document.body.style.background = "lightblue"
//     		}
//     		if(mouseCounter == 3){
//     			document.querySelector("#bgVideo").style.display = "initial";
//     			document.querySelector("#bgVideo").src = "video/ocean.mp4";
//     			document.querySelector("#bgVideo").play();
//     		}
//     		if(mouseCounter == 4){
//     			document.body.style.background = "black"
//     			document.querySelector("#bgVideo").src = "video/road4.mp4";
//     			document.querySelector("#bgVideo").play();
//     		}
//     		if(mouseCounter == 5){
//     			document.querySelector("#bgVideo").pause();
//     			document.querySelector("#bgVideo").style.display = "none";
//     			document.body.style.backgroundImage = "url('video/boxes.gif')"; 
//     		}
//     		if(mouseCounter == 6){
//     			document.body.style.backgroundImage = "url('video/smile.gif')"; 
//     			document.body.style.backgroundRepeat= "no-repeat";
//     			document.body.style.backgroundSize= "cover";
//     		}

//     		if(mouseCounter == 7){
//     			document.body.style.backgroundImage = "url('video/windows.jpg')"; 
//     			    			document.body.style.backgroundRepeat= "no-repeat";
//     			document.body.style.backgroundSize= "cover";
//     		}
//     		if(mouseCounter == 8){
//     			document.body.style.backgroundImage = "url('video/windows7.jpg')"; 
//     			    			document.body.style.backgroundRepeat= "no-repeat";
//     			document.body.style.backgroundSize= "cover";
//     		}
//     		if(mouseCounter == 9){
//     			document.body.style.backgroundImage = "url('video/windows10.jpg')"; 
//     			 document.body.style.backgroundRepeat= "no-repeat";
//     			document.body.style.backgroundSize= "cover";
//     		}

//     		if(mouseCounter == 10){
//     			document.body.style.backgroundImage = "linear-gradient(#9e9f99, #e9e9e7, #ffffff)"; 
//     		}

//     		if(mouseCounter == 11){
//     			document.body.style.backgroundImage = "linear-gradient(white, lightblue)"; 
//     		}


//     		console.log(mouseCounter);
//     }
// }
// document.body.addEventListener('mouseup', upListener)

// document.body.addEventListener('touchend', function(){
//     		// audio.play(); 
//         	texture = new THREE.DataTexture( makeNoise(), width, height, THREE.RGBFormat );
//     		material.displacementMap = texture;
// })



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

 });


export function getMouseTravel(){
    return mousetravel;
}

export function setMouseTravel(val){
    mousetravel = val;
 }

