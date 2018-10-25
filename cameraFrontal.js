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
            canvas = doc.createElement('canvas'),
            video = doc.createElement('video'),
            ctx = canvas.getContext('2d');

      
        var constraints = {
            audio: false,
            video: {
                facingMode: 'user',
                width: 360, height: { min: 640, ideal: 640, max: 1080 }
                // deviceId: device.id ? {exact: device.id} : undefined,
                // width: {exact: candidate.width},    //new syntax
                // height: {exact: candidate.height}   //new syntax
                // width: { min: 360, ideal: 360, max: 1920 },
                // height: { min: 640, ideal: 640, max: 1080 },
            }
        };

        function iniciarCamera() {
            //verificar e remover o elemento canvas antes de fotografar
            let canvas = document.querySelector('canvas');
            // let video = document.querySelector('video');
            if (canvas != null) {
                canvas.remove();
                botoes(true);
            }
            video.setAttribute('muted','');
            video.setAttribute('playsinline','');
            video.setAttribute('autoplay','');
            //video.setAttribute('crossOrigin','anonymous'); //Em caso de problema com o CORS
            // document.querySelector('section').appendChild(video);

            doc.body.appendChild(video);

            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    console.log('Iniciando camera.')
                    const video = document.querySelector('video');
                    video.srcObject = stream;
                })
                .catch(err => console.error('getUserMedia() falhou: ', err));
            botoes(true);

        }
        function pararCamera() {
            botoes(false);
            document.querySelector('video')
                .srcObject
                .getVideoTracks()
                .forEach(track => track.stop())
        }

        function fecharCamera() {
            let video = document.querySelector('video');
            let canvas = document.querySelector('canvas');
            video? video.remove(): null;
            canvas? canvas.remove(): null;
            Array.from(document.getElementsByClassName('botao1')).forEach(function (arg) { arg.style.display = "none" });
            Array.from(document.getElementsByClassName('botao2')).forEach(function (arg) { arg.style.display = "none" });


        }

        function fotografar() {
            // let canvas = document.getElementById('pintura-canvas');
            // let canvas = doc.createElement('canvas').setAttribute('id','pintura-canvas');
            // let context = canvas.getContext('2d');



            let video = document.querySelector('video');
            // dimensao do canvas == dimensao video
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;

            // desenhando 
            ctx.beginPath(); //redefine o path (evita sobrescrever)
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            pararCamera();
            document.querySelector('section').appendChild(canvas);

            // canvas.toBlob(function (blob) {
            //     const url = URL.createObjectURL(blob);
            //     // usar a URL para upload
            //     pararCamera();
            // }, 'image/jpeg', 0.95);
            //fecharCamera();
        }

        function salvarCanvas() {
            let imagemSalva = doc.querySelector('canvas').toDataURL();
            console.log(imagemSalva);
        }

        function botoes(flag) {
            flag ?
                Array.from(document.getElementsByClassName('botao')).forEach(function (arg) { arg.style.display = "inline" }) :
                Array.from(document.getElementsByClassName('botao')).forEach(function (arg) { arg.style.display = "none" });
            !flag ?
                Array.from(document.getElementsByClassName('botao2')).forEach(function (arg) { arg.style.display = "inline" }) :
                Array.from(document.getElementsByClassName('botao2')).forEach(function (arg) { arg.style.display = "none" });
        }

        document.querySelector('#inicar-camera').addEventListener('click', event => {
            iniciarCamera();
        })
        document.querySelector('#parar-camera').addEventListener('click', event => {
            pararCamera();
            fecharCamera();
        })
        document.querySelector('#fotografar').addEventListener('click', event => {
            fotografar();
        })
        document.querySelector('#enviar-foto').addEventListener('click', event => {
            salvarCanvas();
        })
        document.querySelector('#repetir-foto').addEventListener('click', event => {
            iniciarCamera();
        })
    })(this);
}