(function () {
    'use strict';

    angular.module('2077.components.directives')
        .controller('CharactersController', charactersController);

    /* @ngInject */
    function charactersController($scope, $log, GameState, CharacterService) {
        var vm = this;

        vm.getLevelUpCost = getLevelUpCost;
        vm.isLevelUpTooExpensive = isLevelUpTooExpensive;
        vm.levelUpCharacter = levelUpCharacter;
        vm.retrieveCharacterData = retrieveCharacterData;

        activate();

        function activate() {
            vm.retrieveCharacterData();
        }

        ///////////////////////////////////////////////////////////////////////

        function getLevelUpCost(character) {
            return parseInt(character.factor) + parseInt(character.factor * (character.level * 8));
        }

        function isLevelUpTooExpensive(character) {
            var levelUpPrice = vm.getLevelUpCost(character);
            return levelUpPrice > GameState.stats.currentNuyen;
        }

        function levelUpCharacter(character) {
            GameState.stats.currentNuyen -= character.levelUpCost;
            character.level++;
            character.levelUpCost = vm.getLevelUpCost(character);
            recalculateDps();
        }

        function recalculateDps() {
            var newDps = 0.0;
            _.each(vm.characters, function (character) {
                newDps += character.factor * character.level * (GameState.stats.attackSpeed / 1000);
            });

            GameState.stats.dps = newDps;
        }

        function retrieveCharacterData() {
            var promise = CharacterService.getCharacters();
            promise.then(success, failure);

            function success(response) {
                vm.characters = response.data.characters;

                _.each(vm.characters, function (character) {
                    character.level = 0;
                    character.levelUpCost = vm.getLevelUpCost(character);
                });
            }

            function failure(error) {
                $log.error(error);
            }
        }
    }
})();