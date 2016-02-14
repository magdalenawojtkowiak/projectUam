var mainController = require('./mainController.js'),
    mainService = require('./mainService.js');

angular.module('main', [])
    .controller('mainController', mainController)
    .service('mainService', mainService)
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state('root.main', {
                url: '/main',
                views: {
                    'content@': {
                        templateUrl: '../main.html',
                        controller:'mainController as mainController'
                    }
                },
                resolve: {
                    menu: function(mainService) {
                        return mainService.menu.query().$promise;
                    },
                    ingredients: function(mainService) {
                      return mainService.ingredients.query().$promise;
                    },
                    extras: function(mainService) {
                      return mainService.extras.query().$promise;
                    }
                },
                params: {
                    basket: null,
                    extrasBasket: null,
                    totalPrice: null
                }
            });
    }]);
