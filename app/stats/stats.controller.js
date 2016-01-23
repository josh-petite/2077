(function() {
    "use strict";

    angular.module('2077.stats')
        .controller('StatsController', statsController);

    /* @ngInject */
    function statsController(GameState) {
        var vm = this;
        vm.gameState = GameState;

        activate();

        function activate() {
        }

        ///////////////////////////////////////////////////////////////////////
    }
})();