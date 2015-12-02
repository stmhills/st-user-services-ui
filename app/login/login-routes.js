'use strict';

var saffModuleApp = angular.module('saffModuleApp');

saffModuleApp.config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider){
	$stateProvider.state('login', {
		url: '/login',
		controller:'LoginCtrl',
		templateUrl:'login/login.html',
		data : { pageTitle: 'main_nav_logIn_label' }
	});
}]);