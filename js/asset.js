(function(ns){
  var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,
    ground: null,
    car: null,
    road: null,
    moon: null,

    load: function(){
      var resources = [
        {id: 'car', src: 'images/car.png'},
        {id: 'ground', src: 'images/ground.png'},
        {id: 'road', src: 'images/road-long.jpg'},
        {id: 'moon', src: 'images/moon.jpg'},
      ];

      this.queue = new Hilo.LoadQueue();
      this.queue.add(resources);
      this.queue.on('complete', this.onComplete.bind(this));
      this.queue.start();
    },

    onComplete: function(e){
      this.car = this.queue.get('car').content;
      this.ground = this.queue.get('ground').content;
      this.road = this.queue.get('road').content;
      this.moon = this.queue.get('moon').content;

      this.queue.off('complete');
      this.fire('complete');
    }
  });
})(window.game);
