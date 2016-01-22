(function() {
    'use strict';

    angular.module('2077.version', [
            '2077.version.interpolate-filter',
            '2077.version.version-directive'
        ])

        .value('version', '0.1');
})();
