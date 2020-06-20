import { initDistortion } from './app.js';


// var questions = ["How are you today?", "Do you consent to be part of this installation?", "Which platform do you spend most time on?", "Are you proud of yourself?"];
var questions = ["How are you today?", "Do you consent to be part of this installation?"];
var backgroundColor = ["BlanchedAlmond", "DarkSlateBlue", "MediumSpringGreen", "Salmon", "Aqua"];
var index = 0;

function changeQuestion(){

  if(index < questions.length){

    document.querySelector(".loading").style.width = ((100 / questions.length) * (index+1)) + "%";
    // document.querySelector("body").style.backgroundColor = backgroundColor[index];
    if(index < questions.length-1)
    setTimeout(function(){ 
      document.querySelector("label").innerHTML = questions[index];
      document.querySelector("form").style.opacity = 1.0; 
    }, 1000);
    else document.querySelector(".loading-border").style.opacity = 0.0;

    document.querySelector("form").style.opacity = 0.0;

    index++;


    if(index == questions.length){ //Questions done
      document.querySelector('#bgVideo').style.opacity = 0.5;
      document.querySelector("form").style.opacity = 0.0;
      document.querySelector('#bgVideo').play();
      initDistortion();
      document.querySelector('.distortion').style.transition = "all 5s";
      document.querySelector('.distortion').style.opacity = 1.0;
      
    }

  }

}

window.changeQuestion = changeQuestion