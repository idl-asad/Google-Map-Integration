angular.module('starter.directives', [])

    .directive('map', function($compile) {
      return {
        restrict: 'E',
        scope: {
          onCreate: '&',
          currentPosition: '=currentPosition'
        },
        link: function ($scope, $element, $attr) {
          function makeHTML(data){
            return "<div>" +
                "<a ng-click='clickTest()'>"+data.name+"</a>" +
                "<div>"+"Location: "+data.vicinity+"</div>"+
                "</div>"
          }

          function initialize() {

            var mapOptions = {
              center: new google.maps.LatLng($scope.currentPosition.lat,$scope.currentPosition.long),
              //center: new google.maps.LatLng(43.07493, -89.381388),
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($element[0], mapOptions);

            $scope.onCreate({map: map});

            /*Getting All electronics market List*/
            var request = {
              location: mapOptions.center,
              radius: 5000,
              types: ['electronics_store']
            };
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function(data){
              data.forEach(function(markLocations){
                console.log(markLocations)
                var contentString = makeHTML(markLocations);
                var compiled = $compile(contentString)($scope);
                var infowindow = new google.maps.InfoWindow({
                  content: compiled[0]
                });

                var marker = new google.maps.Marker({
                  position:  new google.maps.LatLng(markLocations.geometry.location.k,markLocations.geometry.location.D),
                  map: map
                });

                google.maps.event.addListener(marker, 'click', function() {
                  infowindow.open(map,marker);
                });
                marker.setMap(map)
              })
            });


            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
              e.preventDefault();
              return false;
            });

          }

          if (document.readyState === "complete") {
            initialize();
          } else {
            google.maps.event.addDomListener(window, 'load', initialize);
          }
        }
      }
    });
