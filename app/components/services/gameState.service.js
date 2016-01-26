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
            vm.settings = {
                mob: {
                    lifeBarAnimated: true
                }
            };

            vm.state = {
                attackSpeed: 1000,
                dps: 0.0,
                totalExp: 0,
                totalKills: 0
            };

            vm.cacheAreas();
            $rootScope.$on('spawnMob', spawnMob);
            $rootScope.$on('mobKilled', processReward);
        }

        return {
            getState: getState,
            settings: vm.settings,
            state: vm.state
        };

        ///////////////////////////////////////////////////////////////////////

        function cacheAreas() {
            $http.get('assets/data/areas.json').then(function (response) {
                vm.areas = response.data.areas;
                vm.state.currentArea = vm.areas[0];
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
            vm.state.totalExp += reward.exp;
            vm.state.totalKills++;
        }

        function retrieveNextMob() {
            var mob = vm.state.currentArea.mobs[_.random(0, vm.state.currentArea.mobs.length - 1)];
            mob.maxHp = mob.hp;
            mob.currentHp = mob.hp;

            return mob;
        }

        function spawnMob(e) {
            $rootScope.$broadcast('mobSpawned', retrieveNextMob());
        }
    }
})();