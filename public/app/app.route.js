angular.module('app.route',
    ['ui.router'])

    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('root',{
                url: '',
                abstract: true,
                views:{
                    'nav': {
                        templateUrl:'../nav.html',
                        controller: 'navController as navController'
                    }
                }
            })
    }]);