'use strict';

var saffModuleDirectives = angular.module('saffModuleDirectives');

saffModuleDirectives.directive('title', ['$rootScope', '$timeout', '$filter',
  function($rootScope, $timeout, $filter) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            var title_postfix =  $filter('translate')('Transmition Log');
            var rawTitle = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : "";
            var translatedTitle =  $filter('translate')(rawTitle);
            $rootScope.title = translatedTitle + ' - ' + title_postfix;
          });
        };
        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
  ]);