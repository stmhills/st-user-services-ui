'use strict';

/* Services */

var saffModuleServices = angular.module('saffModuleServices');


saffModuleServices.factory('pageTemplates', ['$http','$resource','$appConstants',
	function($http, $resource,$appConstants){
		$http.defaults.useXDomain = true;
		var pageTemplatesEndPoint = "./pageTemplates/:id.json"; 
	  //var pageTemplatesEndPoint = $appConstants.adminApiEndPoint + '/admin/pageTemplates/:id'; 

		return $resource(pageTemplatesEndPoint , {}, {
			query :  {method: 'GET',  params:{id: 'pageTemplates'}, isArray:true },
		  //query :  {method: 'GET',  params:{}, isArray:true },
			post :  {method: 'POST',  params:{}, isArray:true, headers: {'Content-Type': 'application/x-www-form-urlencoded'} },
			update :  {method: 'PUT', params:{} }
		});
	}]);