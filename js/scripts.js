$(document).ready(function(){

/* affix the navbar after scroll below header */
$('#nav').affix({
      offset: {
        top: $('header').height()-$('#nav').height()
      }
});

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '#nav' })

/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

/* smooth scrolling for nav sections */
$('#nav .navbar-nav li>a').click(function(){
  var link = $(this).attr('href');
  var posi = $(link).offset().top;
  $('body,html').animate({scrollTop:posi},700);
});


//Modal Start
/* when clicking a thumbnail */
$('.panel-thumbnail>a').click(function(e){

    e.preventDefault();
    var idx = $(this).parents('.panel').parent().index();
  	var id = parseInt(idx);

    $($(e.target).attr('data-target')).modal('show');
  	return false;
});

var atheneModal = $('#atheneModal');
var peterModal  = $('#peterModal');
var michaeModal = $('#michaeModal');

//Prev and Next button
//athene
$('#athene_prev').click(function(e){
  atheneModal.modal('hide');
  peterModal.modal('hide');
  michaeModal.modal('show');
});
$('#athene_next').click(function(e) {
  atheneModal.modal('hide');
  peterModal.modal('show');
  michaeModal.modal('hide');
});

//peter
$('#peter_prev').click(function(e) {
  peterModal.modal('hide');
  atheneModal.modal('show');
  michaeModal.modal('hide');
});
$('#peter_next').click(function(e) {
  peterModal.modal('hide');
  atheneModal.modal('hide');
  michaeModal.modal('show');
});

//michae
$('#michae_prev').click(function(e) {
  peterModal.modal('show');
  atheneModal.modal('hide');
  michaeModal.modal('hide');
});
$('#michae_next').click(function(e) {
  peterModal.modal('hide');
  atheneModal.modal('show');
  michaeModal.modal('hide');
});
//Modal End


/* google maps */
google.maps.visualRefresh = true;

var map;
function initialize() {
	var geocoder = new google.maps.Geocoder();
	var address = $('#map-input').text(); /* change the map-input to your address */
	var mapOptions = {
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
     	scrollwheel: false
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  	if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                {
                  content: address,
                  map: map,
                  position: results[0].geometry.location,
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title:address
            });

          } else {
          	alert("No results found");
          }
        }
      });
	}
}
google.maps.event.addDomListener(window, 'load', initialize);
/* end google maps */
});
