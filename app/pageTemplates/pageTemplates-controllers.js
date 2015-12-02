'use strict';

var saffModuleControllers = angular.module('saffModuleControllers');

saffModuleControllers.controller('pageTemplatesCtrl', ['$scope','$state','$uibModal','$filter', 'pageTemplates',
	function($scope,$state,$modal,$filter, pageTemplates) {  

    $scope.refreshData = function(){    
      $scope.pageTemplates = pageTemplates.query();           

      $scope.pageTemplates.$promise.then(function(){        
        if($scope.$state.current.name == "pageTemplates"){
          selectFirstItem();
        }
      });
    };

    $scope.openSearchReportDetailsModal=function(){
      $scope.modalInstance=$modal.open({
        templateUrl: 'pageTemplates/modals/search_modal.html',
        controller:'SearchModalCtrl',
        scope: $scope
      });
    };
  

    $scope.detailsUrl = "pageTemplates.details";
    $scope.refreshData();
  }]);

saffModuleControllers.controller('pageTemplatesDetailsCtrl',['$scope', '$location','$uibModal', '$state','$stateParams', '$filter', 'Notification', 'pageTemplates',
  function($scope, $location, $modal, $state, $stateParams, $filter, Notification, pageTemplates) {
    function loadDetails(){
      $scope.pageTemplatesDetails = pageTemplates.get({id: $stateParams.pageTemplatesId});    
    }
    $scope.save = function(){
      var modelSchema = {
        name : $scope.pageTemplatesDetails.name,
        businessCode : $scope.pageTemplatesDetails.businessCode,
        description : $scope.pageTemplatesDetails.description,
        statusName : $scope.pageTemplatesDetails.statusName
      };
      pageTemplates.update({id:$scope.pageTemplatesDetails.id}, modelSchema, function(response){
        $state.reload();
        Notification.success($filter('translate')('administration_item_update_notification'));          
      }, function(response){
        Notification.error(response.data.errorMessage);        
      });
    }
    $scope.reset = function(){
      loadDetails();
    }
    $scope.confirmModal=function(){
      $scope.modalInstance=$modal.open({
        templateUrl: 'common/views/confirm-modal.html',
        controller:'pageTemplatesConfirmModalCtrl',
        scope: $scope
      });

      $scope.modalInstance.result.then(function(data){
        var id = $scope.$stateParams.pageTemplatesId;
        pageTemplates.delete({id:$stateParams.pageTemplatesId}, function(){          
          $state.go('pageTemplates', {},  {reload: true});
          Notification.success($filter('translate')('administration_item_delete_notification'));  
        }, function(response){
          Notification.error(response.data.errorMessage);        
        });
      })
    };

    loadDetails();
  }]);

saffModuleControllers.controller('pageTemplatesConfirmModalCtrl',['$scope', 'Notification', function($scope, Notification) {
  $scope.itemName = $scope.pageTemplatesDetails.name;

  $scope.confirm = function(){
    $scope.modalInstance.close({ delete : true});      
  };

  $scope.cancel = function(){
    $scope.modalInstance.dismiss('cancel');
  };

}]);

saffModuleControllers.controller('pageTemplatesNewCtrl',['$scope', '$location', '$state','$stateParams','$filter', 'Notification', 'pageTemplates',
  function($scope, $location, $state,$stateParams, $filter, Notification, pageTemplates) {

    $scope.save = function(){
      debugger;
      $scope.saveProgress = pageTemplates.save($scope.pageTemplatesDetails, function(data){
        $state.go('pageTemplates', {},  {reload: true});             
        //$state.go('pageTemplates.details', { pageTemplatesId : data.id },  {reload: true});             
        Notification.success($filter('translate')('administration_item_save_notification'));
      }, function(response){
        Notification.error(response.data.errorMessage);        
      });
    }
  }]);

saffModuleControllers.controller('SearchModalCtrl', ['$scope','$state','$uibModal','$filter','pageTemplates',
  function($scope,$state,$modal,$filter,pageTemplates) {

      $scope.name = '';

    $scope.search = function(){
      if($scope.name !== ""){
        $scope.modalInstance.close();
        $scope.showNameErrorMsg = false;
        //$state.go('search-reports', { reportNumber: $scope.reportNumber});        
      } else {
        $scope.showNameErrorMsg = true;
      }
    };

    $scope.cancel = function(){
      $scope.name = '';
      $scope.showNameErrorMsg = false;
      $scope.modalInstance.dismiss('cancel');
    };


}]);
