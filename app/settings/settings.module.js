(function() {
    "use strict";

    angular.module('2077.settings', []);

    angular.module('2077.settings')
        .config(settingsRoutes);

    /* @ngInject */
    function settingsRoutes($stateProvider) {
        $stateProvider.state('settings', {
            url: '/settings',
            templateUrl: 'settings/settings.html',
            controller: 'SettingsController as vm'
        });
    }
})();