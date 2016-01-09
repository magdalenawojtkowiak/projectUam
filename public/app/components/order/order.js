var orderController = require('./orderController.js'),
    orderService = require('./orderService.js')


angular.module('order', [])
    .controller('orderController', orderController)
    .service('orderService', orderService)
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state('root.order', {
                url: '/order',
                views: {
                    'content@': {
                        templateUrl: '../order.html',
                        controller:'orderController as orderController'
                    }
                },
                params: {
                    order: null,
                    totalPrice: null,
                    basket: null
                }
            });
    }]);