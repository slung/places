function MapCtrl($scope, $location, geolocation, geocoder) {
    
    $scope.initMap = function () {
        var mapOptions = {
            panControl: false,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
                style: google.maps.ZoomControlStyle.SMALL
            },
            zoom: 8,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.HYBRID
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };
    
    $scope.bind = function(fn, c) {
        return function() {
            return fn.apply(c || fn, arguments);
        };
    };
    
    $scope.geolocate = function () {
        geolocation().then(function (position) {
            $scope.position = position;
            
            // Set map center
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.map.setCenter(center);
            
            //Geocode center
            geocoder({latLng: center}).then(function (results) {
                var x = results;
            }, function (error) {});
            
        }, function (reason) {
            $scope.message = "Could not be determined."
        });
    };
    
    $scope.search = function () {
        // Geocode
        geocoder({address: $scope.searchLocation}).then(function (results) {
            var searchBounds = new google.maps.LatLngBounds(new google.maps.LatLng(results[0].geometry.viewport.getSouthWest().lat(), results[0].geometry.viewport.getSouthWest().lng()), new google.maps.LatLng(results[0].geometry.viewport.getNorthEast().lat(), results[0].geometry.viewport.getNorthEast().lng()));
            $scope.searchLocation = results[0].formatted_address;
            $scope.map.fitBounds(searchBounds);
            }, function (error) {});
    };
    
    
    $scope.initMap();
    $scope.geolocate();
}

MapCtrl.$inject = ['$scope', '$location', 'geolocation', 'geocoder'];