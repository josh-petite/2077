(function() {
    "use strict";

    angular.module('2077.settings')
        .controller('SettingsController', settingsController);

    /* @ngInject */
    function settingsController(GameState) {
        var vm = this;
        vm.gameState = GameState;

        activate();

        function activate() {
        }

        ///////////////////////////////////////////////////////////////////////
    }
})();