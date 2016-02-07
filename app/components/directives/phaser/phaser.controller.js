(function () {
    "use strict";

    angular.module('2077.components.directives')
        .controller('PhaserController', phaserController);

    /* @ngInject */
    function phaserController($rootScope, TextService) {
        var vm = this;
        vm.game = {};
        vm.emitter = {};

        vm.create = create;
        vm.preload = preload;
        vm.resolveCollision = resolveCollision;
        vm.update = update;

        activate();

        function activate() {
            var gameEvents = {
                preload: vm.preload,
                create: vm.create,
                update: vm.update
            };

            vm.game = new Phaser.Game(720, 480, Phaser.AUTO, 'phaserContainer', gameEvents);

            $rootScope.$on('mobKilled', displayLoot);
        }

        ///////////////////////////////////////////////////////////////////////

        function create() {
            vm.game.stage.setBackgroundColor(0x2d2d2d);
            //vm.game.add.sprite(0, 0, 'background');
            vm.game.add.sprite(0, 400, 'ground');
            vm.game.physics.startSystem(Phaser.Physics.ARCADE);

            createGoldEmitter();
            createGround();
            TextService.draw({
                x: 70,
                y: 40,
                text: 'Hi Alex!',
                fontSize: 32
            });

            TextService.draw({
                x: 270,
                y: 40,
                text: 'Gold!',
                fontSize: 24
            });
        }

        function createGoldEmitter() {
            vm.emitter = vm.game.add.emitter(0, 0, 100);
            vm.emitter.makeParticles('gold');
            vm.emitter.gravity = 120;
            vm.emitter.setXSpeed(-20, 20);
            vm.emitter.setYSpeed(25, 50);
            vm.emitter.minRotation = 0;
            vm.emitter.maxRotation = 0;
            vm.emitter.x = vm.game.world.centerX;
            vm.emitter.y = vm.game.world.centerY / 2;
            vm.game.physics.arcade.enable(vm.emitter);
        }

        function createGround() {
            vm.platforms = vm.game.add.group();
            vm.platforms.enableBody = true;

            var ground = vm.platforms.create(0, vm.game.world.height - 80, 'ground');
            ground.body.immovable = true;
        }

        function displayLoot(e, reward) {
            vm.emitter.start(false, 3000, null, reward.gold);
        }

        function preload() {
            //vm.game.load.image('background', 'assets/images/areas/brightForest-background.png');
            vm.game.load.image('background', 'assets/images/areas/906.bmp');
            vm.game.load.image('ground', 'assets/images/areas/ground.png');
            vm.game.load.image('gold', 'assets/images/gui/gold.png');
            $rootScope.$broadcast('sceneInitialized', vm.game);
        }

        function resolveCollision(particle, platforms) {
            //$log.info('emitter', particle);
            //$log.info('platforms', platforms);
            particle.body.acceleration.x = 0;
        }

        function update() {
            vm.game.physics.arcade.collide(vm.emitter, vm.platforms, vm.resolveCollision);
        }
    }
})();