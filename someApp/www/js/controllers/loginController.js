angular.module('starter.login.module', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'admin' && pw == 'admin') {
                deferred.resolve('Welcome ' + name + '!');
                //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
            } else {
            	//console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    //are height in css daca vrei mai mare
    $scope.map = { center: { latitude: 46, longitude: 23 }, zoom: 8 };
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