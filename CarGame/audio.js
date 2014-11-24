createAudio = function(filename) {
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    source.src = filename;//+ '.ogg';
  //  source.type = 'audio/ogg; codecs="vorbis"';
    audio.appendChild(source);
    return audio;
};

playAudio=function(filename,loop) {
    var audio = new createAudio(filename);
   
    audio.play();

}