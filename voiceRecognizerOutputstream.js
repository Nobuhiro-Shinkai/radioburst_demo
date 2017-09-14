'use strict';
var VoiceRecognizerBase = require("./voiceRecognizerBase.js");

/**
* VoiceRecognizerOutputStream
*
* サーバー認識を行うためのクラス。自由発話の認識が可能です。
*
* VoiceRecognizerと違いVoiceRecognizerOutputStreamは、録音を行いません。
* VoiceRecognizerAudioOutputStream::write()から、連続した音声データを
* 送ることが出来ます。
*
* 音声データは、16bit 16kHz Little Endianのみの対応となります。
*
* setup()後、start()を呼ぶと録音を行い、認識を開始します。
* \remarks
* 音声データを全て送り終わった後、直ぐに認識結果を取得したい場合には、
* stop()を呼んで下さい。
*
*/
class VoiceRecognizerOutputStream extends VoiceRecognizerBase {
  constructor(resultHandler, updatedHandler, utteranceHandler) {
      super(true, resultHandler, updatedHandler, utteranceHandler);
  }

};

module.exports = VoiceRecognizerOutputStream;
