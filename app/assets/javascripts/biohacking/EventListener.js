Biohacking.EventListener = function(){
  this._listeners = {};
  
  this.register = function( events ) {
    Object.keys(events).forEach(function(event) {
      this._listeners[event] = events[event];
    }, this);
  };
  
  this.fireEvent = function(event, options) {
    var listener = this._listeners[event];
    if( listener ) {
      listener.handler.call( listener.scope || this, this, options );
    }
  };
}
