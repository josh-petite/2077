(function() {
    'use strict';

    angular.module('2077.components.directives')
        .directive('mob', mob);

    /* @ngInject */
    function mob() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: true,
            controller: 'MobController as vm',
            templateUrl: 'components/directives/mob/mob.html'
        };
    }
})();