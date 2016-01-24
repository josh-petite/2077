(function() {
    "use strict";

    angular.module('2077.components.services')
        .factory('CharacterService', characterService);

    /* @ngInject */
    function characterService($http) {
        return {
            getCharacters: getCharacters
        };

        function getCharacters() {
            return $http.get('assets/data/characters.json');
        }
    }
})();