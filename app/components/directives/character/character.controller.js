(function () {
    'use strict';

    angular.module('2077.components.directives')
        .controller('CharacterController', characterController);

    /* @ngInject */
    function characterController($log, GameState) {
        var vm = this;
        vm.gameState = GameState;

        vm.isTooExpensive = isTooExpensive;
        vm.getCharacter = getCharacter;
        vm.levelUpCharacter = levelUpCharacter;

        activate();

        function activate() {
            vm.character = vm.getCharacter();
        }

        ///////////////////////////////////////////////////////////////////////

        function isTooExpensive() {
            var levelUpPrice = vm.gameState.getLevelUpCost(vm.character);
            return levelUpPrice > vm.gameState.getNuyen();
        }

        function getCharacter() {
            var character = vm.gameState.getCharacter(vm.name);
            return character || vm.gameState.registerCharacter(vm.name, vm.factor);
        }

        function levelUpCharacter() {
            vm.gameState.levelUpCharacter(vm.character);
        }
    }
})();