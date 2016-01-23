(function() {
    "use strict";

    angular.module('2077.stats', []);

    angular.module('2077.stats')
        .config(statRoutes);

    /* @ngInject */
    function statRoutes($stateProvider) {
        $stateProvider.state('stats', {
            url: '/stats',
            templateUrl: 'stats/stats.html',
            controller: 'StatsController as vm'
        });
    }
})();