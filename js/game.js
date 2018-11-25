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
      this.width = innerWidth * dpr;
      this.height = innerHeight * dpr;
      this.scale = 1 / dpr;

      var containerElem = document.getElementById('main-stage');

      this.stage = new Hilo.Stage({
        renderType: 'canvas',
        width: this.width,
        height: this.height,
        scaleX: this.scale,
        scaleY: this.scale
      });
      document.body.appendChild(this.stage.canvas);

      // 舞台刷新和渲染
      this.ticker = new Hilo.Ticker(60);
      this.ticker.addTick(Hilo.Tween);
      this.ticker.addTick(this.stage);
      this.ticker.start();
      this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
      this.stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true);


      // 地面
      var groundOffset = 60;
      this.ground = new Hilo.Bitmap({
          id: 'ground',
          image: this.asset.ground,
          scaleX: 1,
      }).addTo(this.stage);

      //设置地面的y轴坐标
      this.ground.y = Math.round(this.height - this.ground.height);
      //移动地面
      Hilo.Tween.to(this.ground, {
        x: -groundOffset
      }, {
        duration: 300,
        loop: true
      });
      // endof 地面

      // car
      this.car = new Hilo.Bitmap({
        id: 'car',
        image: this.asset.car,
        x: 0.5 * this.width * this.scale,
        y: 0.5 * this.height * this.scale,
      }).addTo(this.stage);

      Hilo.util.copy(this.car, Hilo.drag);
      this.car.startDrag([0, 0, this.width, this.ground.y]);
      console.log('this.car: ', this.car);
      console.log('this.stage: ', this.stage);
      // endof car
    },
  };
}())
