import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,

  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  displayMap(map, origin, addresses, radius, contents, daycares) {
    var resultsFound = false;
    var geocoder = new this.googleMaps.Geocoder();
    var bounds = new google.maps.LatLngBounds();
    var index = 0;
    var withinRadius = [];
    var service = new google.maps.DistanceMatrixService();
    var distanceText = [];
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: addresses,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, function(response, status) {

      if (status === google.maps.DistanceMatrixStatus.OK) {
        var destinations = response.destinationAddresses;

        var results = response.rows[0].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.value;
          var to = destinations[j];
          if (distance <= radius) {
            resultsFound = true;
            distanceText.push(element.distance.text);
            geocoder.geocode( {'address': to}, function(results, status) {
              if(status === google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: results[0].geometry.location
                });
                bounds.extend(marker.position);
                map.fitBounds(bounds);

                var infowindow = new google.maps.InfoWindow({
                  content: contents[index]
                });
                marker.addListener('click', function() {
                  infowindow.open(map, marker);
                });

                if(index % 2 === 0) {
                  $('.list-col1').append(
                  '<div class="thumbnail daycare-listing">' +
                    '<div class="row">' +
                      '<div class="col-xs-4 thumbnail-content">' +
                        '<img class="list-image" src=' + daycares[index].get('image1') + '>' +
                      '</div>' +
                      '<div class="col-xs-6 thumbnail-content">' +
                        '<div><strong><a href="/daycare/' + daycares[index].get('id') + '">'+ daycares[index].get('name') + '</a></strong></div>' +
                        '<div><span class="fa fa-home"></span> ' + daycares[index].get('address') + '</div>' +
                        '<div><span class="fa fa-phone"></span> ' + daycares[index].get('phone') + '</div>' +
                        '<div class="fa fa-car"> ' + distanceText[index] + '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>');
                }
                else {
                  $('.list-col2').append(
                  '<div class="thumbnail daycare-listing">' +
                    '<div class="row">' +
                      '<div class="col-xs-4 thumbnail-content">' +
                        '<img class="list-image" src=' + daycares[index].get('image1') + '>' +
                      '</div>' +
                      '<div class="col-xs-6 thumbnail-content">' +
                        '<div><strong><a href="/daycare/' + daycares[index].get('id') + '">'+ daycares[index].get('name') + '</a></strong></div>' +
                        '<div><span class="fa fa-home"></span> ' + daycares[index].get('address') + '</div>' +
                        '<div><span class="fa fa-phone"></span> ' + daycares[index].get('phone') + '</div>' +
                        '<div class="fa fa-car"> ' + distanceText[index] + '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>');
                }

                index++;
              }
              else {
                alert("It didn't work because" + status);
              }
            });
          }
        }
        //display home marker if daycares within radius found
        if(resultsFound === true) {
          geocoder.geocode( {'address': origin}, function(results, status) {
            if(status === google.maps.GeocoderStatus.OK) {
              var homeMarker = new google.maps.Marker({
                label:'A',
                map: map,
                animation: google.maps.Animation.DROP,
                position: results[0].geometry.location
              });
              bounds.extend(homeMarker.position);
              map.fitBounds(bounds);
            }
            else {
              alert("It didn't work because" + status);
            }
          });
        }
        else {
          alert("Sorry, there are no registered daycares in your area.");
        }
      }
    });
  },
  autoComplete(input, options) {
    return new google.maps.places.Autocomplete(input, options);
  },
  listener(autocomplete) {
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      document.getElementById('address').val = place.formatted_address;
    });
  }
});
