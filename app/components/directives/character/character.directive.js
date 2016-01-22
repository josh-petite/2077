(function() {
    'use strict';

    angular.module('2077.components.directives')
        .directive('character', character);

    /* @ngInject */
    function character() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                name: '@',
                factor: '@',
                portrait: '@'
            },
            controller: 'CharacterController as vm',
            templateUrl: 'components/directives/character/character.html'
        };
    }
})();