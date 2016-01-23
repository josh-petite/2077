(function () {
    'use strict';

    angular.module('2077', [
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate',
        '2077.version',
        '2077.battlefield',
        '2077.settings',
        '2077.stats',
        '2077.components'
    ]);

    angular.module('2077')
        .config(defaultRoutes)
        .config(translations);

    /* @ngInject */
    function defaultRoutes($urlRouterProvider) {
        $urlRouterProvider.otherwise('/battlefield');
    }

    /* @ngInject */
    function translations($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/i18n/locale-',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.preferredLanguage('en');
    }
})();
