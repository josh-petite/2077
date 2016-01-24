(function() {
    'use strict';

    angular.module('2077.components.directives')
        .directive('characters', characters);

    /* @ngInject */
    function characters() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: true,
            controller: 'CharactersController as vm',
            templateUrl: 'components/directives/characters/characters.html'
        };
    }
})();