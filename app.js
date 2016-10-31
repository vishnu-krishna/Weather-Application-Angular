var weatherapp = angular.module('weatherapp', ['ngRoute', 'ngResource']);
//Routing
weatherapp.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        }).when('/forecast', {
            templateUrl: 'Forecast.html',
            controller: 'forecastController',            
        }).when('/forecast/:days', {
            templateUrl: 'Forecast.html',
            controller: 'forecastController'        
        })
    })
//Service for using common objects
weatherapp.service('cityService', function () {
        this.city = "Nagercoil", 
        this.days = "2"
    })
//Controllers - Home Controller
weatherapp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.limit = 16;
    $scope.days = cityService.days;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })
    $scope.$watch('days', function () {
        cityService.days = $scope.days;
    })  
}]);
//Controllers - forecast Controller
weatherapp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function ($scope, cityService, $resource, $routeParams) {
    $scope.state=true;
    $scope.days = $routeParams.days || 2;
    $scope.city = cityService.city;
    $scope.days = cityService.days;
    $scope.limit = 16;
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily', {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: 'JSONP'
        }
    })
    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city
        , cnt: $scope.days
        , appid: '3fa19a5704ed4735dd0b31d8f7250f60'
    })
    $scope.convertToCelsius = function (degK) {
        return (degK - 273.15).toFixed(2);
    }
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    }
}]);
