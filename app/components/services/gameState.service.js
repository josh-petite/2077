(function () {
    'use strict';

    angular.module('2077.components.services')
        .factory('GameState', gameState);

    /* @ngInject */
    function gameState($rootScope, $http, $log) {
        var vm = this;

        vm.cacheAreas = cacheAreas;

        activate();

        function activate() {
            vm.cacheAreas();

            vm.settings = {
                mob: {
                    lifeBarAnimated: true
                }
            };

            vm.stats = {
                attackSpeed: 1000,
                dps: 0.0,
                totalExp: 0,
                totalKills: 0
            };

            $rootScope.$on('spawnMob', spawnMob);
            $rootScope.$on('mobKilled', processReward);
        }

        return {
            getState: getState,
            settings: vm.settings,
            stats: vm.stats
        };

        ///////////////////////////////////////////////////////////////////////

        function cacheAreas() {
            $http.get('assets/data/areas.json').then(function (response) {
                vm.areas = response.data.areas;
                vm.currentArea = vm.areas[0];
                $rootScope.$broadcast('mobSpawned', retrieveNextMob());
            }, handleError);
        }

        function getState() {
            return {};
        }

        function handleError(error) {
            $log.error(error);
        }

        function processReward(e, reward) {
            vm.stats.totalExp += reward.exp;
            vm.stats.totalKills++;
        }

        function retrieveNextMob() {
            var index = _.random(0, vm.currentArea.mobs.length - 1);
            vm.currentArea.mobs[index].maxHp = vm.currentArea.mobs[index].hp;
            vm.currentArea.mobs[index].currentHp = vm.currentArea.mobs[index].hp;

            return vm.currentArea.mobs[index];
        }

        function spawnMob(e) {
            $rootScope.$broadcast('mobSpawned', retrieveNextMob());
        }
    }
})();