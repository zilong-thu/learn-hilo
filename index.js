var Hilo = window.Hilo;
var containerElem = document.getElementById('main-stage');

var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var stage = new Hilo.Stage({
  container:document.body,
  width: gameWidth,
  height: gameHeight,
});

stage.enableDOMEvent(Hilo.event.POINTER_START, true);

// 舞台刷新和渲染
var ticker = new Hilo.Ticker(60);
ticker.addTick(stage);
ticker.start();

var car = new Hilo.Bitmap({
  image: 'images/red-car-top.png'
}).addTo(stage);

car.on(Hilo.event.POINTER_START, function(e){
  console.log(e.eventTarget, e.stageX, e.stageY);
});
