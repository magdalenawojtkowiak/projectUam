var contactController = require('./contactController.js'),
    contactService = require('./contactService.js');

angular.module('contact', [])
    .controller('contactController', contactController)
    .service('contactService', contactService)
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state('root.contact', {
                url: '/contact',
                views: {
                    'content@': {
                        templateUrl: '../contact.html',
                        controller:'contactController as contactController'
                    }
                },
                resolve: {
                    contact: function(contactService){
                        return contactService.contact.get().$promise;
                    }
                }
            });
    }]);