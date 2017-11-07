(function (app) {
  'use strict';
  app.directive('sideBar', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/layout/sideBar.html'
    }
  });


})(angular.module('common.ui'));