require('./app.route.js');
require('./components/main/main.js');
require('./components/order/order.js');
require('./components/status/status.js');
require('./components/contact/contact.js');
require('./components/nav/nav.js');
/*
 @ngInject
 */
angular.module('pizzeria', [
        'app.route',
        'main',
        'contact',
        'order',
        'status',
        'nav',
        'ngMaterial',
        'ngResource'
    ])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '400',
                'hue-1': '200',
                'hue-2': '700',
                'hue-3': 'A200'
            })

            .accentPalette('deep-purple', {
                'default': '300',
                'hue-1': '200',
                'hue-2': '100',
                'hue-3': 'A200'
            });
    });
