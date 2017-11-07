(function (app) {
  'use strict';

  app.controller('indexCtrl', indexCtrl);

  indexCtrl.$inject = ['$scope', '$location']

  function indexCtrl($scope, $locationF) {
    $scope.pageClass = 'page-home';
    $scope.loadingMovies = true;
    $scope.loadingGenres = true;
    $scope.isReadOnly = true;

    $scope.latestMovies = [];


  }


})(angular.module('common.core'));