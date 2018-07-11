// Geolocation detection with JavaScript, HTML5 and PHP
// http://locationdetection.mobi/
// Andy Moore
// http://andymoore.info/
// this is linkware if you use it please link to me:
// <a href="http://web2txt.co.uk/">Mp3 Downloads</a>

// this is called when the browser has shown support of navigator.geolocation
function GEOprocess(position) {
	// update the page to show we have the lat and long and explain what we do next
  document.getElementById('geo').innerHTML = 'Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude;
	// now we send this data to the php script behind the scenes with the GEOajax function
	//GEOajax("http://localhost/alarinna/page/geo?accuracy=" + position.coords.accuracy + "&latlng=" + position.coords.latitude + "," + position.coords.longitude +"&altitude="+position.coords.altitude+"&altitude_accuracy="+position.coords.altitudeAccuracy+"&heading="+position.coords.heading+"&speed="+position.coords.speed+"");

  $("#latitude").val(position.coords.latitude); 
  $("#longitude").val(position.coords.longitude); 

   //alert( position.coords.longitude);
   var geourl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+ position.coords.longitude +'&key=AIzaSyDwTHM3l29DcBR2NjLUOywLemBpXa__2zs';
   $.getJSON(geourl, function (data) {
      //console.log(data.results[0].address_components[3].long_name);
      var street_number = data.results[0].address_components[0].long_name;
      var street_name = data.results[0].address_components[1].long_name;
      var neighborhood = data.results[0].address_components[2].long_name;
      var city = data.results[0].address_components[4].long_name;
      var state = data.results[0].address_components[5].long_name;
      var country = data.results[0].address_components[6].long_name;
      var country_short = data.results[0].address_components[6].short_name;
      var city_state = city + ', '+state;
      
      var address = street_number+ ' '+street_name+ ', '+neighborhood+ ' '+city+', '+state+ ', '+country ;
      $("#address").val(address);
      $("#street_number").val(street_number);
      $("#street_name").val(street_name);
      $("#neighborhood").val(neighborhood);
      $("#city").val(city);
      $("#state").val(state);
      $("#country").val(country);
      $("#country_short").val(country_short);

      $("#city_state").val(city_state);

      $("#city1").append(city);
      //$("select#city").append("<option value=" + city + ">" + city + "</option>"); 
      //$("select.city1").append('<option selected="selected" value="0">'+ city+ ' </option>');

      $('.city').append(city+ ' <i class="icon-heart"></i>');

      function addtoselect(param,value){
          $('select.city1').append('&lt;option value='+country+'&gt;'+param+'&lt;/option&gt;');
      }

    });
    
   
}



// this is used when the visitor bottles it and hits the "Don't Share" option
function GEOdeclined(error) {
  document.getElementById('geo').innerHTML = 'Error: ' + error.message;
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(GEOprocess, GEOdeclined);
}else{
  document.getElementById('geo').innerHTML = 'Your browser sucks. Upgrade it.';
}

// this checks if the browser supports XML HTTP Requests and if so which method
if (window.XMLHttpRequest) {
 xmlHttp = new XMLHttpRequest();
}else if(window.ActiveXObject){
 xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// this calls the php script with the data we have collected from the geolocation lookup
function GEOajax(url) {
 xmlHttp.open("GET", url, true);
 xmlHttp.onreadystatechange = updatePage;
 xmlHttp.send(null);
}

// this reads the response from the php script and updates the page with it's output
function updatePage() {
 if (xmlHttp.readyState == 4) {
  var response = xmlHttp.responseText;

  //console.log(response)
  //document.getElementById("geo").innerHTML = '' + response;
 }
}













