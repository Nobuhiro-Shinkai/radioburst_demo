'use strict';
var HandsfreeControlBase = require("./handsfreeControlBase.js");



/**
 * HandsfreeControl
 *
 * "Ok Google / Hey Siri"のようにデバイスに呼びかける単語(トリガーワード)を認識するためのクラス。
 * triggerWordsプロパティにセットした単語群のみが認識可能です。
 *
 * HandsfreeControlは、setup()後、start()を呼ぶと録音を行い、認識を開始します。
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
class HandsfreeControl extends HandsfreeControlBase {
    constructor(resultHandler, utteranceHandler) {
        super(false, resultHandler, utteranceHandler);
    }
};

module.exports = HandsfreeControl;
