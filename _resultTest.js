var request = require('request');
var crypto = require('crypto');
var fs = require("fs");
var spawn = require('child_process').spawn;

var resultData = '\
{ "results": \
   [ { "tokens": [],\
       "confidence": 1,\
       "starttime": 0,\
       "endtime": 1700,\
       "tags": [],\
       "rulename": "",\
       "text": "こんにちは" } ],\
  "utteranceid": "20170803/10/301285972_20170803_100003",\
  "text": "こんにちは",\
  "alternative": \
  {"updated at":"2017/08/01 20:12","speech data":"詳細について教えて","answer data":"すべての機能一覧を読み上げますか？|(はい,そうです,よみあげて,おねがいします,つづけて)合計で１０個の機能があります。機能の説明を以降してます。|(いいえ,そうじゃない,ちがう,ちがいます)それでは、よく利用されている機能を５件紹介いたします。１件目は～、2件目は～、です。ご利用になりたい機能を音声で入力してください。","speech id":"1634351068"},\
  "statuscode": 0,\
  "message": "" }';

var jsonResult = JSON.parse(resultData);
//console.log('\n');
//console.log(jsonResult.alternative['answer data']);

var array = jsonResult.alternative['answer data'].split( '|' );
//console.log(array);
if (array.length == 1) { // 条件分岐がない
  // 音声再生して終了
  playtts(array[0]);
} else {// 条件分岐がある
  var res1 = array[1].substring(1, array[1].indexOf(')')).split(',');
  var ans1 = array[1].substr(array[1].indexOf(')')+1);
  var res2 = array[2].substring(1, array[2].indexOf(')')).split(',');
  var ans2 = array[2].substr(array[2].indexOf(')')+1);
  var grammarData = res1.concat(res2);
  console.log('res1: ' + res1);
  console.log('res2: ' + res2);
  console.log('grammarData: ' + grammarData);
  console.log('ans1: ' + ans1);
  //
  console.log('ans2: ' + ans2);
  playtts(array[0]);
}

function playtts(text) {
  console.log(text);

  var url = "https://tts.amivoice.com/tts/txt2wav"
  var md5hash = crypto.createHash('md5');
  var date = formatDate(new Date());
  var md5hex = function(src){
    var md5hash = crypto.createHash('md5');
    md5hash.update(src, 'binary');
    return md5hash.digest('hex');
  };
  console.log("date: " + date);
  var propertiesObject = { 'serviceId':'ami','dateTime':date, 'password':md5hex(date+'amivoice'), 'text':text, 'speakerId':'308'};

  request({url:url, qs:propertiesObject,encoding: null}, function(err, response, body) {
    if(err) { console.log(err); return; }
    console.log("Get response: " + response.statusCode);
    console.log("content-type: " + response.headers['content-type']);
    if (response.headers['content-type'] == 'audio/mpeg') {
      fs.writeFileSync('tts.mp3', body);
      var player = spawn('sox', ['tts.mp3', '-t', 'alsa', 'hw:1']);
    } else {
	  console.log("body: " + body);
    }
  });

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
