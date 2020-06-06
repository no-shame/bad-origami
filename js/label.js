function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}






function  formatDate(date){
  //Need to finish this
  return date    
}





function initMap() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);


      var locRequest = new XMLHttpRequest();
      locRequest.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=AIzaSyAZl79D2Z2t0LKwJuXebToC3qOJ9P6H8ME`);
      locRequest.onload = function() {
        var ourData = JSON.parse(locRequest.responseText);
        console.log(ourData.plus_code.compound_code);

        var description = document.querySelector('.description');

        var locationStr = ourData.plus_code.compound_code + `, Latitude : ${crd.latitude.toFixed(5)}` + `, Longitude: ${crd.longitude}` + `, More or less ${crd.accuracy.toFixed(5)} meters acurate.`;

          var d = new Date();
          console.log(formatAMPM(d));
          console.log(d.getFullYear());

         description.innerHTML =      `L
                                      ONDON
                                      INFORMaTION &
                                      SPRING EXHIBITION,
                                      2/2-2/16, ${d.getFullYear()}
                                      SAT-SUN,
                                      ${formatAMPM(d).toUpperCase()}-${formatAMPM(new Date(d.getTime() + 15*60000)).toUpperCase()}, 
                                      FREE ADMISSION,
                                      LOCATION OF INSTALLATION: 
                                      ${locationStr.toUpperCase()}
                                      `







         var placard = document.querySelector('.placard');
         placard.classList.add("opened");

         setTimeout(function(){ placard.style.wordBreak = "normal"; }, 4000);

      };
      locRequest.onerror = function () {
        console.log("** An error occurred during the transaction");
      };
      locRequest.send();

  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);



}