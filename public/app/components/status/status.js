var statusController = require('./statusController.js'),
    statusService = require('./statusService.js');


angular.module('status', [])
    .controller('statusController', statusController)
    .service('statusService', statusService)
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state('root.status', {
                url: '/status/:statusId',
                views: {
                    'content@': {
                        templateUrl: '../status.html',
                        controller:'statusController as statusController'
                    }
                },
                resolve: {
                    order: function($stateParams, statusService){
                        return statusService.getOrder.get({id: $stateParams.statusId}).$promise
                    }
                }
            });
    }]);