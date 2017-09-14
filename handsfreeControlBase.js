'use strict';
var robotsdkjs = require('./build/Release/robotsdkjs');
var eventEmitter = require('events').EventEmitter;



/**/
class HandsfreeControlBase extends robotsdkjs.HandsfreeControlJs {

    constructor(type, resultHandler, updatedHandler, utteranceHandler) {
      super(type);

      var handsfreeControl_ = this;

      var runAsync_handsfree = function() {
        handsfreeControl_.callback(function(type, json) {
          console.log("H " + type + "," + json);
          if (type == 0 && resultHandler != null) {
            resultHandler(json);
          } else if (type == 1 && updatedHandler != null) {
            updatedHandler(json);
          } else if (type == 2 && utteranceHandler != null) {
            utteranceHandler(json);
          }
          handsfreeControl_.emitter.emit('run-again-handsfree');
        });
      }

      this.emitter = new eventEmitter();
      this.emitter.on('run-again-handsfree', runAsync_handsfree);
      runAsync_handsfree();
    }
}

module.exports = HandsfreeControlBase;
