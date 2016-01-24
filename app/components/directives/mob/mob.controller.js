(function() {
    'use strict';

    angular.module('2077.components.directives')
        .controller('MobController', mobController);

    /* @ngInject */
    function mobController($scope, $log, GameState) {
        var vm = this;
        vm.gameState = GameState;

        activate();

        function activate() {
            $scope.$on('mobSpawned', updateCurrentMob);
            $scope.$on('attackMob', attackMob);
            $scope.$emit('spawnMob');
        }

        ///////////////////////////////////////////////////////////////////////

        function updateCurrentMob(e, newMob) {
            vm.currentMob = newMob;
        }

        function attackMob(e) {
            if (!vm.currentMob) {
                return;
            }

            vm.currentMob.currentHp -= GameState.stats.dps;

            if (vm.currentMob.currentHp <= 0) {
                $scope.$emit('mobKilled', vm.currentMob.reward);
                $scope.$emit('spawnMob');
            }
        }
    }
})();