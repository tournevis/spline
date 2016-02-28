export default class sound{
//https://developer.mozilla.org/fr/docs/Web/API/Web_Audio_API#Example
  constructor(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.analyseur = this.audioCtx.createAnalyser();
    this.analyseur.fftSize = 1024;
    console.log("sounds ctx init");
  }

 loadSound(url) {
    this.request = new XMLHttpRequest();
    this.request.open('GET', url, true);
    this.request.responseType  = 'arraybuffer';
    // Decode asynchronously
    this.request.onload = ()=> {
    this.audioCtx.decodeAudioData(this.request.response, (buffer) => {
      console.log(" my buffer : " + buffer)
        this.myBuffer = buffer;
        this.playSound() ;

      }, () => {
      console.log( "error" )
    });
    }
    this.request.send();
  }

  playSound() {
    this.source = this.audioCtx.createBufferSource();
    this.source.connect(this.analyseur);  // creates a sound this.source
    this.source.buffer = this.myBuffer;                    // tell the this.source which sound to play
    this.source.connect(this.audioCtx.destination);
    this.source.start(0);// play the source now
  }
  getData(){
    this.dataArray= new Uint8Array(256);                                        // note: on older systems, may have to use deprecated noteOn(time);
    this.dataBuffer = this.analyseur.frequencyBinCount;
    this.space = window.innerWidth / this.dataBuffer;
    this.analyseur.getByteTimeDomainData(this.dataArray);

    return this.dataArray ;
  }
}
