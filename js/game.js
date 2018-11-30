(function() {
  window.onload = function() {
    game.init();
  }

  var game = window.game = {
    init: function() {
      this.asset = new game.Asset();
      this.asset.on('complete', function(e) {
        this.asset.off('complete');
        this.initStage();
      }.bind(this));
      this.asset.load();
    },

    initStage: function() {
      var dpr = window.devicePixelRatio;
      this.width = window.innerWidth * dpr;
      this.height = window.innerHeight * dpr;
      this.scale = 1 / dpr;

      var containerElem = document.getElementById('main-stage');

      this.stage = new Hilo.Stage({
        renderType: 'canvas',
        width: this.width,
        height: this.height,
        scaleX: this.scale,
        scaleY: this.scale,
      });
      document.body.appendChild(this.stage.canvas);

      // 舞台刷新和渲染
      this.ticker = new Hilo.Ticker(60);
      this.ticker.addTick(Hilo.Tween);
      this.ticker.addTick(this.stage);
      this.ticker.start();
      this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
      this.stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true);
      //舞台更新
      this.stage.onUpdate = this.onUpdate.bind(this);

      // 地面
      var groundOffset = this.height;
      this.road = new Hilo.Bitmap({
        id: 'road',
        image: this.asset.road,
        scaleY: 2 * this.height / this.asset.road.height,
        scaleX: this.width / this.asset.road.width,
        x: 0,
        y: -groundOffset,
      }).addTo(this.stage);

      //移动地面
      Hilo.Tween.to(this.road, {
        y: 0
      }, {
        duration: 6000,
        loop: true
      });
      // endof 地面

      // car
      this.car = new Hilo.Bitmap({
        id: 'car',
        image: this.asset.car,
        x: 0.5 * (this.width - this.asset.car.width),
        y: this.height - 2 * this.asset.car.height,
      }).addTo(this.stage);

      Hilo.util.copy(this.car, Hilo.drag);
      this.car.startDrag([0, 0, this.width - this.car.width, this.height - this.car.height]);
      console.log('this.car: ', this.car);
      console.log('this.stage: ', this.stage);
      // endof car

      // 添加障碍物
      this.holdback = new Hilo.Bitmap({
        image: this.asset.moon,
        rect: [0, 0, this.asset.moon.width, this.asset.moon.height],
        scaleX: 0.3,
        scaleY: 0.3,
      }).addTo(this.stage);
      // endof 障碍物
    },

    onUpdate: function() {
      // 碰撞检测
      // if (this.car.hitTestObject(this.ground)) {
      //   console.log('collision happend.');
      // }
    }
  };
}())
