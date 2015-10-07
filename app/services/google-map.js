import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,

  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  codeAddress(map, origin, addresses, radius) {
    var withinRadius = [];
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: addresses,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {

      if (status === google.maps.DistanceMatrixStatus.OK) {
        var destinations = response.destinationAddresses;

          var results = response.rows[0].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.value;
            var to = destinations[j];
            if (distance <= radius) {
              withinRadius.push(to);
            }
          }
        return withinRadius;
      }
    });
  },
  setMarkers(map, addresses, contents) {
    var geocoder = new this.googleMaps.Geocoder();
    var bounds = new google.maps.LatLngBounds();
    var index = 0;
    addresses.forEach(function(address) {
      geocoder.geocode( {'address': address}, function(results, status) {
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
          index++;
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        }
        else {
          alert("It didn't work because" + status);
        }
      });
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
