(function() {
    "use strict";

    angular.module('2077.components.directives')
        .directive('phaser', phaser);

    /* @ngInject */
    function phaser() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: true,
            controller: 'PhaserController as vm',
            templateUrl: 'components/directives/phaser/phaser.html'
        }
    }
})();