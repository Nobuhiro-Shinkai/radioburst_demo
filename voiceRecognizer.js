'use strict';
var VoiceRecognizerBase = require("./voiceRecognizerBase.js");



/**
 * VoiceRecognizer
 *
 * サーバー認識を行うためのクラス。自由発話の認識が可能です。
 *
 * VoiceRecognizerは、setup()後、start()を呼ぶと録音を行い、認識を開始します。
 *
 * OSがlinuxの場合ALSAから録音を行います。
 * \remarks
 *  録音に失敗する場合には、ご使用の端末が16bit 16kHzで録音可能であることを
 *  ご確認ください。
 * \remarks
 *  録音デバイスのオープンは以下の様な試行を行います。
 * \paragraph p1
 *  1. "plughw:0" 16kHz
 *  2. "hw:0" 16kHz
 *  3. "hw:0" 48kHz (自前で48kHz -> 16kHz にダウンサンプリングを行う)
 *  4. 1 ～ 3 を試して開けなければ失敗を通知\n
 *  特定の録音デバイスをID：0とするには、\ref alsaorder "ALSAデバイスの読み込み順の設定"を参照
 */
class VoiceRecognizer extends VoiceRecognizerBase {
    constructor(resultHandler, updatedHandler, utteranceHandler) {
        super(false, resultHandler, updatedHandler, utteranceHandler);
    }
};

module.exports = VoiceRecognizer;
