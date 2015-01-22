angular.module('starter.controllers', [])
    .controller('MapCtrl', function($scope, $ionicLoading) {
      $scope.mapCreated = function(map) {
        $scope.map = map;

      };
      $scope.myPosition = {
        lat: 24.8614622,
        long: 67.0099388
      }
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.myPosition.lat = position.coords.latitude;
        $scope.myPosition.long = position.coords.longitude;
      })
    });
