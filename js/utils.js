import * as THREE from 'https://threejs.org/build/three.module.js';



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

