(function() {
    'use strict';

    angular.module('2077.components.directives')
        .controller('SceneController', sceneController);

    /* @ngInject */
    function sceneController($scope, $log, GameState) {
        var vm = this;
        vm.gameState = GameState;

        activate();

        function activate() {
        }

        ///////////////////////////////////////////////////////////////////////
    }
})();