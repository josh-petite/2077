(function () {
    'use strict';

    angular.module('2077.components.services')
        .factory('GameState', gameState);

    /* @ngInject */
    function gameState($rootScope, $http, $log) {
        var vm = this;

        activate();

        function activate() {
            vm.characters = [];
            vm.mobs = [];
            vm.nuyen = 1;
            vm.dps = 0.0;
            vm.attackSpeed = 500;
            vm.settings = {
                mobView: {
                    lifeBarAnimated: true
                }
            };

            $rootScope.$on('spawnMob', spawnMob);
            $rootScope.$on('mobKilled', processReward);
        }

        return {
            getAttackSpeed: getAttackSpeed,
            getCharacter: getCharacter,
            getDps: getDps,
            getLevelUpCost: getLevelUpCost,
            getNuyen: getNuyen,
            levelUpCharacter: levelUpCharacter,
            registerCharacter: registerCharacter,
            settings: vm.settings
        };

        ///////////////////////////////////////////////////////////////////////

        function getAttackSpeed() {
            return vm.attackSpeed;
        }

        function getCharacter(name) {
            return _.find(vm.characters, function (character) {
                return character.name === name;
            });
        }

        function getDps() {
            return vm.dps;
        }

        function getLevelUpCost(character) {
            return parseInt(character.factor) + parseInt(character.factor * (character.level * 8));
        }

        function getNuyen() {
            return vm.nuyen;
        }

        function handleError(error) {
            $log.error(error);
        }

        function levelUpCharacter(character) {
            var levelUpPrice = getLevelUpCost(character);
            character.level++;
            character.next = getLevelUpCost(character);

            vm.nuyen -= levelUpPrice;
            recalculateDps();
        }

        function processReward(e, reward) {
            vm.nuyen += _.random(reward.nuyen[0], reward.nuyen[1]);
        }

        function recalculateDps() {
            var newDps = 0.0;
            _.each(vm.characters, function (character) {
                newDps += character.factor * character.level * (vm.attackSpeed / 1000);
            });

            vm.dps = newDps;
        }

        function registerCharacter(name, factor) {
            var character = {
                name: name,
                factor: factor,
                level: 0
            };

            character.next = getLevelUpCost(character);
            vm.characters.push(character);
            return character;
        }

        function retrieveNextMob() {
            var index = _.random(0, vm.mobs.length - 1);
            vm.mobs[index].maxHp = vm.mobs[index].hp;
            vm.mobs[index].currentHp = vm.mobs[index].hp;

            return vm.mobs[index];
        }

        function spawnMob(e) {
            if (!vm.mobs || !vm.mobs.length) {
                var promise = $http.get('components/services/gameState/mobData.json');
                promise.then(function (response) {
                    vm.mobs = response.data.mobs;
                    $rootScope.$broadcast('mobSpawned', retrieveNextMob());
                }, handleError);
            } else {
                $rootScope.$broadcast('mobSpawned', retrieveNextMob());
            }
        }
    }
})();