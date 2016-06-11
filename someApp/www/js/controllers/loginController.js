angular.module('starter.login.module', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    //are height in css daca vrei mai mare
    //$scope.map = { center: { latitude: 46.766667, longitude: 23.58333300000004 }, zoom: 15 };
    $scope.login = function() {
      var url = 'ceva url';
      var data = $scope.data;
      console.log('data', data);
        LoginService.create(url, data)
          .success(function(data) {
            $state.go('tab.main');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your username and password!'
            });
        });
    }
})
