(function () {
    'use strict';

    angular.module('2077.components.directives')
        .controller('CharactersController', charactersController);

    /* @ngInject */
    function charactersController($log, CharacterService) {
        var vm = this;

        vm.retrieveCharacterData = retrieveCharacterData;

        activate();

        function activate() {
            vm.retrieveCharacterData();
        }

        ///////////////////////////////////////////////////////////////////////

        function retrieveCharacterData() {
            var promise = CharacterService.getCharacters();
            promise.then(success, failure);

            function success(response) {
                vm.characters = response.data.characters;
            }

            function failure(error) {
                $log.error(error);
            }
        }
    }
})();