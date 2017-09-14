var HandsfreeControl = require("./handsfreeControl.js");
var VoiceRecognizerOutputStream = require("./voiceRecognizerOutputstream.js");
var VoiceRecognizer = require("./voiceRecognizer.js");
var fs = require('fs');
var spawn = require('child_process').spawn;
var Sound = require('node-aplay');
var timer;
var voiceRecognizerOutputStream = null;
var voiceRecognizer = null;

const scenario1 = "ニッポンほーそーきどー";
const scenario2 = "きょーのハイライト";
const scenario3 = "きのー.の.オールナイトニッポンのハイライト";
const scenario4 = "オールナイトニッポン おかむら みやさこ";
const scenario5 = "すとっぷ";

var triggars = ["アレクサ"];
var triggars2 = [scenario1, scenario2, scenario3, scenario4, scenario5];
var mainProgram;
var subProgram;
var subProgramInterrupt = false;
const audioPlayHw = "hw:0";
const cancelSound = "a1_18280.wav";
const pinponSound = "correct2.wav";
const showupnighterSound = "./audiodata/showup_nighter.wav";
const showupHighlightSound = "./audiodata/showup_highlight.wav";
const allnightHighlightSound = "./audiodata/allnight_nippon_highlight.wav";
const allnightMiyasakotSound = "./audiodata/allnight_nippon_miyasako.wav";

const defaultVolume = 30;
var currentVolume = 20;

function resetTriggarword( words ) {
    handsfreeControl.stop();
    handsfreeControl.serviceId = "DSRBetaService01";
    handsfreeControl.servicePassword = "BetaPassword0000";
    handsfreeControl.enginemodePath = "./AmiCarMobile16k/recognizer.xc";
    handsfreeControl.confidenceLevel = 0.06;
    //handsfreeControl.outputDebugLog = true;
    handsfreeControl.triggerWords = words;
    handsfreeControl.segmenterProperties = "preTime=100 postTime=700 threshold=10000 preForcedTime=300 postForcedTime=300 volumeMode=0";
    handsfreeControl.setup();
    handsfreeControl.start();
}


var resultEmitter = function( json) {
  console.log(json);
  if (json.statuscode == 0) { // 認識成功
    var result = json.text.replace(/%wildcard%/g, '');
    console.log(result);
    console.log("subProgram[" + subProgram + "]")
    if (triggars.indexOf(json.text.replace(/%wildcard%/g, '')) >= 0) {
      handsfreeControl.stop();
      playSync(pinponSound, function () {
          resetTriggarword(triggars2);
		});
	  changeVolume(10);
    } else {
      if (subProgram) {
        subProgramInterrupt = true;
		subProgram.stop();
		subProgram = null;
	  }
      if (scenario1.indexOf(result) >= 0) {
		if (!mainProgram) {
		    mainProgram = new Sound(showupnighterSound);
		    mainProgram.play();
			console.log("mainProgram starts");
        }
      } else if (scenario2.indexOf(result) >= 0) {
        if (mainProgram) {
			mainProgram.pause();
		}
		subProgram = new Sound(showupHighlightSound);
      } else if (scenario3.indexOf(result) >= 0) {
        if (mainProgram) {
			mainProgram.pause();
		}
		subProgram = new Sound(allnightHighlightSound);
      } else if (scenario4.replace(/\s/g, '').indexOf(result) >= 0) {
        if (mainProgram) {
			mainProgram.pause();
		}
		subProgram = new Sound(allnightMiyasakotSound);
      } else if (scenario5.indexOf(result) >= 0) {
        if (mainProgram) {
			mainProgram.stop();
		    mainProgram = null;
		}
      }
	  if (subProgram) {
        subProgram.play();
		subProgram.on('complete', function () {
		  console.log('subProgram is complete! subProgramInterrupt[' + subProgramInterrupt + "]");
		  if (!subProgramInterrupt && mainProgram) mainProgram.resume();
          subProgramInterrupt = false;
		});
      }
　　　changeVolume(defaultVolume);
      resetTriggarword( triggars );
    }
  }
};

var utteranceEmitter = function(utteranceStarted) {
    console.log("utterance[" + utteranceStarted + "]");
};

changeVolume(defaultVolume);
var handsfreeControl = new HandsfreeControl(resultEmitter, null, utteranceEmitter);

handsfreeControl.serviceId = "DSRBetaService01";
handsfreeControl.servicePassword = "BetaPassword0000";
handsfreeControl.enginemodePath = "./AmiCarMobile16k/recognizer.xc";
//handsfreeControl.outputDebugLog = true;
handsfreeControl.triggerWords = triggars;
//handsfreeControl.audioLogFilename = "recording.wav"
handsfreeControl.confidenceLevel =  0.06;
handsfreeControl.segmenterProperties = "preTime=100 postTime=700 threshold=12000 preForcedTime=300 postForcedTime=300 volumeMode=0";

handsfreeControl.setup();
handsfreeControl.start();

function playSync(file, callback = null) {
  console.log("playSync(" + file + ")");
  var music = new Sound(file);
  music.play();
  if (callback) {
     music.on('complete', function () {
      callback();
    });
  }
}

function changeVolume(vol) {
  console.log("changeVolume(" + vol + ")");
  var count = vol - currentVolume;
  var volChange = function(){
	if (count > 0) {
		count--;
	} else {
		count++;
	}
    //console.log(count--);
	spawn('amixer', ['-c', '0', 'set', 'PCM', String(vol - count)]);
    if (count)
      setTimeout(volChange, 75);
  } 
  volChange();

}

/**
 * 日付をフォーマットする
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
function formatDate(date, format) {
  if (!format) format = 'YYYYMMDDhhmmss';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};
