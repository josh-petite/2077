(function() {
    'use strict';

    angular.module('2077.battlefield', []);

    angular.module('2077.battlefield')
        .config(battlefieldRoutes);

    /* @ngInject */
    function battlefieldRoutes($stateProvider) {
        $stateProvider.state('battlefield', {
            url: '/battlefield',
            templateUrl: 'battlefield/battlefield.html',
            controller: 'BattlefieldController as vm'
        });
    }
})();