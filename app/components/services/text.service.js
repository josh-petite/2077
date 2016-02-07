(function () {
    "use strict";

    angular.module('2077.components.services')
        .factory('TextService', textService);

    /* @ngInject */
    function textService($rootScope, $log, $window) {
        var vm = this;

        activate();

        function activate() {
            $rootScope.$on('sceneInitialized', bindWebFont);
        }

        ///////////////////////////////////////////////////////////////////////

        return {
            draw: draw
        };

        function bindWebFont(e, game) {
            vm.game = game;
            //  The Google WebFont Loader will look for this object, so create it before loading the script.
            $window.WebFontConfig = {
                //  The Google Fonts we want to load (specify as many as you like in the array)
                google: {
                    families: ['Revalia']
                }
            };

            vm.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        }

        function draw(payload) {
            vm.game.time.events.add(Phaser.Timer.SECOND, drawProxy, this);

            function drawProxy() {
                var text = vm.game.add.text(payload.x, payload.y, payload.text);
                text.anchor.setTo(0.5);

                text.font = 'Revalia';
                text.fontSize = payload.fontSize;

                //  x0, y0 - x1, y1
                var gradient = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
                gradient.addColorStop(0, '#8ED6FF');
                gradient.addColorStop(1, '#004CB3');
                text.fill = gradient;

                text.align = 'center';
                text.stroke = '#000000';
                text.strokeThickness = 2;
                text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

                text.inputEnabled = true;
                text.input.enableDrag();

                text.events.onInputOver.add(function () {
                    text.fill = '#ff00ff';
                }, this);
                text.events.onInputOut.add(function () {
                    text.fill = gradient;
                }, this);
            }
        }
    }
})();