

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

