'use strict';

var saffModuleApp = angular.module('saffModuleApp');

saffModuleApp
.constant("$appConstants", {
	"adminApiEndPoint": "http://certificationservices-stmicroservices.rhcloud.com/certificationsvc/certification"
})
.config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/pageTemplates');     
}])
.config(function($httpProvider) { 
	$httpProvider.defaults.useXDomain = true; 
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.config(function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: 'common/language/locale-',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.forceAsyncReload(true);
	$translateProvider.useLocalStorage();
})
.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 10000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
})
.value('cgBusyDefaults',{
  message:'',
  backdrop: true,  
  templateUrl: '/common/progress_template.html',
  delay: 0,
  minDuration: 300,
  wrapperClass: ''
})


var languageKey = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
var saffModuleControllers = angular.module('saffModuleControllers'); 
saffModuleControllers.controller('languageController', ['$translate', '$scope','$state','$stateParams', function ($translate, $scope, $state, $stateParams ) {
	
	$scope.changeLanguage = function (langKey) {
		languageKey = langKey;
		$translate.use(langKey);
    //
    $state.transitionTo($state.current, $stateParams, {
    	reload: true,
    	inherit: false,
    	notify: true
    });
	//
};


}]);
