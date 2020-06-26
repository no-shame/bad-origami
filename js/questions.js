import { initDistortion } from './app.js';




for(var i = 0; i < 10; i++){        

  var option = document.createElement("option");
  option.innerHTML = i+1;
  option.value = i+1;
  document.querySelector('#answer').appendChild(option);

}


var options = ["Yes", "No", "Maybe"];
var options2 = ["Digital", "Real"];



var questions = ["Do you consent to be part of this interactive installation?", "Which platform do you spend most time on?", "Are you proud of yourself?"];
// var questions = ["How are you today?", "Do you consent to be part of this installation?"];
var backgroundColor = ["BlanchedAlmond", "DarkSlateBlue", "MediumSpringGreen", "Salmon", "Aqua"];
var index = 0;

function changeQuestion(){

  if(index < questions.length){

    while (document.querySelector('#answer').childNodes.length > 1) {
        document.querySelector('#answer').removeChild(document.querySelector('#answer').lastChild);
    }

    if(index != 1){
      for(var i = 0; i < 3; i++){        

        var option = document.createElement("option");
        option.innerHTML = options[i];
        option.value = i+1;
        document.querySelector('#answer').appendChild(option);

      }
    }else{
      for(var i = 0; i < 2; i++){        

        var option = document.createElement("option");
        option.innerHTML = options2[i];
        option.value = i+1;
        document.querySelector('#answer').appendChild(option);

      }
    }

    document.querySelector('#answer').value = ' ___________ ';

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
      // document.querySelector('#bgVideo').style.opacity = 0.5;
      document.querySelector("form").style.opacity = 0.0;
      document.querySelector('#bgVideo').play();
      initDistortion();
      document.querySelector('.loading-border').style.transition = "none";
      document.querySelector('.distortion').style.opacity = 1.0;
      document.querySelector('.distortion').style.pointerEvents = "auto";

       document.querySelector('.bgAll').style.opacity = 1.0;
      
    }

  }

}

window.changeQuestion = changeQuestion