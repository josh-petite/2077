(function() {
    'use strict';

    angular.module('2077.components.directives')
        .directive('primaryNav', primaryNav);

    /* @ngInject */
    function primaryNav() {
        return {
            restrict: 'E',
            scope: {},
            //bindToController: true,
            //controller: 'PrimaryNavController as vm',
            templateUrl: 'components/directives/primaryNav/primaryNav.html'
        };
    }
})();