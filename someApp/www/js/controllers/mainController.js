angular.module('starter.main.module', [])

.controller('MainCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    //are height in css daca vrei mai mare
    $scope.map = {
      center: { latitude: 46.766667, longitude: 23.58333300000004 },
      zoom: 15
    };

    $scope.options = {disableDefaultUI: true};
    var createRandomMarker = function (i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i,
            show: false
        };
        ret.onClick = function() {
            console.log("Clicked!");
            ret.show = !ret.show;
        };
        ret[idKey] = i;
        return ret;
    };

    $scope.onClick = function() {
      console.log(2364128);
    }

    $scope.randomMarkers = [];

     var markers = [
       {id: 0, latitude: 46.785982, longitude: 23.578928, show: false, title: 'asdas', onClick: function() { console.log(12121)}},
       {id: 1, latitude: 46.778998, longitude: 23.588934, show: false, title: 'test'},
       {id: 2, latitude: 46.772989, longitude: 23.598936, show: false, title: 'test'},
       {id: 3, latitude: 46.765982, longitude: 23.578928, show: false, title: 'test'},
       {id: 4, latitude: 46.7744614, longitude: 23.590157, show: false, title: 'test'}
     ]
     $scope.randomMarkers = markers;

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.main');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your username and password!'
            });
        });
    }
})
