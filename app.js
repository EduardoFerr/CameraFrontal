alert("Sorria para a foto!!!");
//Navegadores mais antigos podem não implementar mediaDevices, então definimos primeiro um objeto vazio
window.onload=function(){

if (navigator.mediaDevices === undefined) {
    console.log("MediaDevice não suportado no navegador padrão");
    navigator.mediaDevices = {};
}else{
    console.log("Podemos preparar a câmera");
}

var App = (function (global) {
    console.log("Iniciando a aplicação...");
    var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    video = doc.createElement('video'),
    ctx = canvas.getContext('2d');
    video.setAttribute('id', 'camera');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    canvas.setAttribute('id', 'foto');

    doc.body.appendChild(video);
    doc.body.appendChild(canvas);

    function IniciarCamera () {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
            .then((stream) => {
                document.getElementById('camera').srcObject = stream
            })
    }
    function PararCamera () {
        document.getElementById('camera')
            .srcObject
            .getVideoTracks()
            .forEach(track => track.stop())
    }
    
    document.querySelector('#inicar-camera').addEventListener('click', event => {
        IniciarCamera();
    })
    document.querySelector('#parar-camera').addEventListener('click', event => {
        PararCamera();
    })






 })(this);
}