'use strict';

var saffModuleApp = angular.module('saffModuleApp');

saffModuleApp.config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider){

	$stateProvider
	.state('pageTemplates', {
		url: '/pageTemplates',
		controller:'pageTemplatesCtrl',
		templateUrl:'pageTemplates/pageTemplates.html',
		data : { pageTitle: 'administration_pageTemplates_label' }
	})
	.state('pageTemplates.details', {
		url: '/details/:pageTemplatesId',
		controller:'pageTemplatesDetailsCtrl',
		templateUrl:'pageTemplates/pageTemplates_details.html',
		data : { pageTitle: 'administration_pageTemplateDetails_label' }
	})
	.state('pageTemplates.new', {
		url: '/new/:pageTemplatesId',
		controller:'pageTemplatesNewCtrl',
		templateUrl:'pageTemplates/pageTemplates_empty.html',
		data : { pageTitle: 'administration_add_pageTemplate_label' }
	})

}]);
