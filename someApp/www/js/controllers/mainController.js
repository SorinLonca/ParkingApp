angular.module('starter.main.module', [])

.controller('MainCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    //are height in css daca vrei mai mare
    $scope.map = { center: { latitude: 46.766667, longitude: 23.58333300000004 }, zoom: 15 };
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
