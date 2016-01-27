(function () {
    "use strict";

    angular.module('2077.components.directives')
        .controller('PhaserController', phaserController);

    /* @ngInject */
    function phaserController($rootScope) {
        var vm = this;
        vm.game = {};
        vm.emitter = {};

        vm.create = create;
        vm.preload = preload;
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
            vm.game.add.sprite(0, 0, 'background');
            vm.game.add.sprite(0, 300, 'ground');
            vm.game.physics.startSystem(Phaser.Physics.ARCADE);

            createGoldEmitter();
            createGround();
        }

        function createGoldEmitter() {
            vm.emitter = vm.game.add.emitter(0, 0, 100);
            vm.emitter.makeParticles('gold');
            vm.emitter.gravity = 150;
            vm.emitter.setXSpeed(-25, 25);
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

            var ground = vm.platforms.create(0, vm.game.world.height - 180, 'ground');
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
        }

        function update() {
            vm.game.physics.arcade.collide(vm.emitter, vm.platforms);
        }
    }
})();