(function() {
    'use strict';

    angular.module('2077.version.interpolate-filter', [])

        .filter('interpolate', ['version', function(version) {
            return function(text) {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
        }]);
})();

