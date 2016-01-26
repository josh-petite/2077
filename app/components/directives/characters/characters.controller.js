(function () {
    'use strict';

    angular.module('2077.components.directives')
        .controller('CharactersController', charactersController);

    /* @ngInject */
    function charactersController($rootScope, $log, GameState, CharacterService) {
        var vm = this;

        vm.getNextLevelExpTotal = getNextLevelExpTotal;
        vm.canLevelUp = canLevelUp;
        vm.levelUpCharacter = levelUpCharacter;
        vm.retrieveCharacterData = retrieveCharacterData;

        activate();

        function activate() {
            vm.retrieveCharacterData();

            $rootScope.$on('mobKilled', processReward);
        }

        ///////////////////////////////////////////////////////////////////////

        function getNextLevelExpTotal(character) {
            return parseInt(character.factor) + parseInt(character.factor * (character.level * 8));
        }

        function canLevelUp(character) {
            var neededExp = vm.getNextLevelExpTotal(character);
            return neededExp < character.nextLevel;
        }

        function levelUpCharacter(character) {
            character.level++;
            character.nextLevel = vm.getNextLevelExpTotal(character);
            character.exp = 0;
            recalculateDps();
        }

        function processReward(e, reward) {
            _.each(vm.characters, function (character) {
                if (character.inParty) {
                    character.exp += reward.exp;

                    if (character.exp >= character.nextLevel) {
                        vm.levelUpCharacter(character);
                    }
                }
            });
        }

        function recalculateDps() {
            var newDps = 0.0;
            _.each(vm.characters, function (character) {
                newDps += character.factor * character.level * (GameState.state.attackSpeed / 1000);
            });

            GameState.state.dps = newDps;
        }

        function retrieveCharacterData() {
            var promise = CharacterService.getCharacters();
            promise.then(success, failure);

            function success(response) {
                vm.characters = response.data.characters;

                _.each(vm.characters, function (character) {
                    character.level = character.level || 0;
                    character.exp = 0;
                    character.nextLevel = vm.getNextLevelExpTotal(character);
                });

                recalculateDps();
            }

            function failure(error) {
                $log.error(error);
            }
        }
    }
})();