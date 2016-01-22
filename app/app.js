(function () {
    'use strict';

    angular.module('2077', [
            'ui.router',
            'ui.bootstrap',
            '2077.version',
            '2077.battlefield',
            '2077.settings',
            '2077.components'
        ]);

    angular.module('2077').config(defaultRoutes);

    /* @ngInject */
    function defaultRoutes($urlRouterProvider) {
        $urlRouterProvider.otherwise('/battlefield');
    }
})();
