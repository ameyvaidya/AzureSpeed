﻿angular
    .module('azurespeed')
    .controller('downloadCtrl', ['$scope', '$http', '$controller', function ($scope, $http, $controller) {
        $controller('mainCtrl', { $scope: $scope });

        $scope.$on('checkChanged', function (event, message) {
            console.log($scope.user.regions);
            $scope.items = regions.where(function (d) { return $scope.user.regions.indexOf(d.id) != -1 });
            angular.forEach($scope.user.regions, function (value, key) {
                console.log(value);
                var region = regions.first(function (d) { return d.id == value });
                console.log(region);
                var data = { region: region.name, blobName: '100MB.bin', operation: 'download' };
                $http.get('/api/sas', { params: data }).success(function (response) {
                    region.url = response;
                    console.log(response);
                });
            });
        });
    }]);