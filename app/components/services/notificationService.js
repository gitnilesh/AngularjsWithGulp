﻿(function (app) {
  'use strict';

  app.factory('notificationService', notificationService)

  function notificationService() {
    toastr.options = {
      'debug': false,
      'positionClass': 'toastr-top-right',
      'onclick': null,
      'fadeIn': 300,
      'fadeout': 1000,
      'timeout': 3000,
      'extendedTimeOut': 1000
    };

    var service = {
      displaySuccess: displaySuccess,
      displayError: displayError,
      displayWarning: displayWarning,
      displayInfo: displayInfo
    };

    function displaySuccess(message) {
      toastr.success(message);
    }

    function displayError(error) {
      if (Array.isArray(error)) {
        error.forEach(function (err) {
          toas.error(err);
        });
      } else {
        toastr.error(error);
      }
    }

    function displayWarning(message) {
      toastr.warning(message);
    }

    function displayInfo(message) {
      toastr.info(message);
    }

    return service;
  }

})(angular.module('common.core'));