'use strict';
var robotsdkjs = require('./build/Release/robotsdkjs');
var eventEmitter = require('events').EventEmitter;



/**/
class VoiceRecognizerBase extends robotsdkjs.VoiceRecognizerJs {

    constructor(type, resultHandler, updatedHandler, utteranceHandler) {
      super(type);

      var voiceRecognizer_ = this;

      var runAsync_recognizer = function() {
        voiceRecognizer_.callback(function(type, json) {
          //console.log("R " + type + "," + json);
          if (type == 0 && resultHandler != null) {
            resultHandler(json);
          } else if (type == 1 && updatedHandler != null) {
            updatedHandler(json);
          } else if (type == 2 && utteranceHandler != null) {
            utteranceHandler(json);
          }
          voiceRecognizer_.emitter.emit('run-again-recognizer');
        });
      }

      voiceRecognizer_.emitter = new eventEmitter();
      voiceRecognizer_.emitter.on('run-again-recognizer', runAsync_recognizer);
      runAsync_recognizer();
    }
}

module.exports = VoiceRecognizerBase;
