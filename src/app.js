/* App Module */
var placesApp = angular.module('places', ['ngRoute', 'ngStorage'],
  function($routeProvider, $locationProvider) {
      
    $routeProvider.when('/map', {
      templateUrl: 'partials/map.html',
      controller: MapCtrl
    });
      
    $routeProvider.otherwise({redirectTo: '/map'})
});