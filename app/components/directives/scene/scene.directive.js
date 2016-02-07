(function() {
    'use strict';

    angular.module('2077.components.directives')
        .directive('scene', scene);

    /* @ngInject */
    function scene() {
        return {
            restrict: 'EA',
            scope: {},
            bindToController: true,
            controller: 'SceneController as vm',
            templateUrl: 'components/directives/scene/scene.html'
        };
    }
})();