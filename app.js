// alert("Sorria para a foto!!!");
window.onload = function () {
    //Navegadores mais antigos podem não implementar mediaDevices, então definimos primeiro um objeto vazio

    if (navigator.mediaDevices === undefined) {
        console.log("MediaDevice não suportado no navegador padrão");
        navigator.mediaDevices = {};
    } else {
        console.log("Podemos preparar a câmera");
    }

    if (window.screen.availHeight !== window.screen.height) {
        // alguma coisa está ocupando algum espaço na tela!
        console.log("Alguma coisa está ocupando algum espaço na tela!")
    }

    var App = (function (global) {
        console.log("Iniciando a aplicação...");
        var doc = global.document,
            win = global.window,
            body = doc.body,
            canvas = doc.createElement('canvas'),
            // video = doc.createElement('video'),
            fotografar = doc.createElement('button'),
            ctx = canvas.getContext('2d');


        // video.setAttribute('id', 'camera');
        // video.setAttribute('muted', '');
        // video.crossOrigin = 'anonymous';
        // video.setAttribute('autoplay', '');
        // // video.play();

        // // body.setAttribute('width',window.screen.availWidth);
        // // body.setAttribute('height',window.screen.availHeight);
        // video.setAttribute('width', window.screen.availWidth);
        // video.setAttribute('height', window.screen.availHeight);
        // video.setAttribute('position', 'absolute');
        // video.setAttribute('padding', '20px');
        // video.setAttribute('z-index', '1');

        // canvas.setAttribute('id', 'foto');
        // canvas.setAttribute('display', 'none');


        // doc.querySelector('section').appendChild(video);
        // doc.body.appendChild(canvas);
        // doc.body.appendChild(fotografar);
        
        function iniciarCamera() {
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user', width: window.screen.availWidth, height: window.screen.availHeight
                }
            })
                .then((stream) => {
                    const video = document.querySelector('video');
                    video.srcObject = stream;
                })
                .catch(err => console.error('getUserMedia() failed: ', err));
            // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: window.screen.availWidth, height: window.screen.availHeight }, audio: false })
            //     .then((stream) => {
            //         let video = document.querySelector('video');
            //         if ("srcObject" in video) {
            //             video.srcObject = stream;
            //         } else {
            //             video.src = window.URL.createObjectURL(stream);
            //         };
            //         video.onloadedmetadata = function (e) {
            //             video.play();
            //         };
            //         // document.getElementById('camera').srcObject = stream

            //     }).catch(function (err) {
            //         console.log(err.name + ": " + err.message);
            //     });
            Array.from(document.getElementsByClassName('botao')).forEach(function (arg) { arg.style.display = "inline" })

        }
        function PararCamera() {
            document.getElementById('camera')
                .srcObject
                .getVideoTracks()
                .forEach(track => track.stop())
        }

        function fecharCamera() {
            document.querySelector('video').remove();
            Array.from(document.getElementsByClassName('botao')).forEach(function (arg) { arg.style.display = "none" })

        }

        document.querySelector('#inicar-camera').addEventListener('click', event => {
            iniciarCamera();
        })
        document.querySelector('#parar-camera').addEventListener('click', event => {
            PararCamera();
        })


        document.querySelector('.take-picture').addEventListener('click', event => {
            let canvas = document.getElementById('picture-canvas');
            let context = canvas.getContext('2d');
            let video = document.querySelector('video');
            // dimensao do canvas == dimensao video
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
            // desenhando 
            context.beginPath(); //redefine o path (evita sobrescrever)
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                // usar a URL para upload
                PararCamera();
            }, 'image/jpeg', 0.95);
            fecharCamera();
        })
    })(this);
}