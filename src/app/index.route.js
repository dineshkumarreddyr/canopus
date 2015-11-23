(function () {
    'use strict';

    angular
      .module('canopus')
      .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('login', {
              url: '/',
              templateUrl: 'app/components/login/canopus.login.html',
              controller: 'LoginController',
              controllerAs: 'vm'
          })
          .state('dashboard', {
              url: '/dashboard',
              templateUrl: 'app/main/main.html',
              controller: 'MainController',
              controllerAs: 'vm'
          });

        $urlRouterProvider.otherwise('/');
    }

})();
