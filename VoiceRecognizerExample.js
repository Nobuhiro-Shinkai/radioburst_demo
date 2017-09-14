var VoiceRecognizer = require("./voiceRecognizer.js");

var resultEmitter = function( json) {
    console.log(json);
    voiceRecognizer.stop();
};

var utteranceEmitter = function(utteranceStarted) {
    console.log("utterance[" + utteranceStarted + "]");
};

var voiceRecognizer = new VoiceRecognizer(resultEmitter, null, utteranceEmitter);

voiceRecognizer.serviceId = "DSRBetaService01";
voiceRecognizer.servicePassword = "BetaPassword0000";
voiceRecognizer.confPath = "./recognizer.conf";
voiceRecognizer.server = "106.187.246.134:25114";
voiceRecognizer.outputDebugLog = true;
voiceRecognizer.languageModel = "-AmiMobileIPhone16k_KDDI_OhanashiAssistant";
voiceRecognizer.extension = 'h{"v":"5.0.0","u":"rasberry","m":"pi"}';

voiceRecognizer.setup();
voiceRecognizer.start();
