(function(ns){

var Holdbacks = ns.Holdbacks = Hilo.Class.create({
  Extends: Hilo.Container,
  constructor: function(props) {
    Holdbacks.superclass.constructor.call(this, props);

    this.moveTween = new Hilo.Tween(this, null, {
      onComplete: () => {},
    });
  },
});

}(window.game))
