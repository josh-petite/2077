(function () {
    'use strict';

    angular.module('2077.components.services')
        .factory('GameState', gameState);

    /* @ngInject */
    function gameState($rootScope, $http, $log) {
        var vm = this;

        activate();

        function activate() {
            vm.mobs = [];

            vm.settings = {
                mob: {
                    lifeBarAnimated: true
                }
            };

            vm.stats = {
                attackSpeed: 1000,
                currentNuyen: 1,
                dps: 0.0,
                totalKills: 0,
                totalNuyen: 1
            };

            $rootScope.$on('spawnMob', spawnMob);
            $rootScope.$on('mobKilled', processReward);
            $rootScope.$on('characterLeveledUp', processLevelUp);
        }

        return {
            getState: getState,
            settings: vm.settings,
            stats: vm.stats
        };

        ///////////////////////////////////////////////////////////////////////

        function getState() {
            return {};
        }

        function handleError(error) {
            $log.error(error);
        }

        function processLevelUp(e, character) {

            recalculateDps();
        }

        function processReward(e, reward) {
            var nuyen = _.random(reward.nuyen[0], reward.nuyen[1]);
            vm.stats.currentNuyen += nuyen;
            vm.stats.totalNuyen += nuyen;
            vm.stats.totalKills++;
        }



        function retrieveNextMob() {
            var index = _.random(0, vm.mobs.length - 1);
            vm.mobs[index].maxHp = vm.mobs[index].hp;
            vm.mobs[index].currentHp = vm.mobs[index].hp;

            return vm.mobs[index];
        }

        function spawnMob(e) {
            if (!vm.mobs || !vm.mobs.length) {
                var promise = $http.get('assets/data/mob.json');
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