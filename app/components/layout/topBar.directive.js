(function (app) {

  'use strict';
  app.directive('topBar', function () {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/components/layout/topBar.html'
    }

  });

})(angular.module('common.ui'));