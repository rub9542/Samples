var recorder;
var recorderScreen;
var mediaStream;
var screenStream;
var fileName;
var fileNameScreen;
var connection;
var connectionScreen;

export default class BrigoshaRecorder {


 getVideoStream() {
        var config = { video: true, audio: true };
        var userstream;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        .then(function (stream) {
            mediaStream = stream;
            getRecorder();
        })
    };

 getScreenStream() {
        navigator.mediaDevices.getDisplayMedia()
        .then(function (stream) {
            screenStream = stream;
            getScreenRecorder();
        })
    };

 getRecorder() {
        var options = { mimeType: 'video/webm', audioBitsPerSecond: 128000 };
        recorder = new MediaRecorder(mediaStream, options);
        recorder.ondataavailable = videoDataHandler;
    };

 getScreenRecorder() {
        var options = { mimeType: 'video/webm' };
        recorderScreen = new MediaRecorder(screenStream, options);
        recorderScreen.ondataavailable = screenDataHandler;
    };

 videoDataHandler(event) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = function (event) {
            connection.send(reader.result);
        };
    };

 screenDataHandler(event) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = function (event) {
            connectionScreen.send(reader.result);
        };
    };

 getWebSocket() {
        var websocketEndpoint = 'ws://localhost:7000';
        connection = new WebSocket(websocketEndpoint);
        connection.binaryType = 'arraybuffer';
        connection.onmessage = function (message) {
            fileName = message.data;
        }

        connectionScreen = new WebSocket(websocketEndpoint);
        connectionScreen.binaryType = 'arraybuffer';
        connectionScreen.onmessage = function (message) {
            fileNameScreen = message.data;
        }
    };

 updateVideoFile() {
        var video = document.getElementById('recorded-video');
        var fileLocation = 'http://localhost:7000/uploads/'
            + fileName + '.webm';
        video.setAttribute('src', fileLocation);

        var screen = document.getElementById('recorded-screen');
        var fileLocation = 'http://localhost:7000/uploads/'
            + fileNameScreen + '.webm';
        screen.setAttribute('src', fileLocation);
    };

 startRecording() {
        recorder.start(1000);
        recorderScreen.start(1000);
 }

 stopRecording() {
        recorder.stop();
        recorderScreen.stop();
 }

}

    //need to call these 3 functions
    // getVideoStream();
    // getScreenStream();
    // getWebSocket();
