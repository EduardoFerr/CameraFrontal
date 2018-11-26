// alert("Sorria para a foto!!!");
"use strict";


// navigator.camera.getPicture = camera(function(){


//     return imag
// },
// function(){


// });

var CameraFrontal = (function(global){
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        video = doc.createElement('video'),
        ctx = canvas.getContext('2d');
    // largura = screen.width;
    // altura = screen.height;
// console.log(doc);
    canvas.height = screen.availHeight;
    canvas.width = screen.availWidth;
    canvas.style.position = "absolute";
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.padding = '0px';
    canvas.style.margin = '0px';
    canvas.style.background = 'lightblue';

    doc.body.insertAdjacentHTML("beforeend", 
    `<section class="check" style="text-align: center; position: absolute; z-index: 1;">
        <button type="button" class="button btn rpt btn-primary">Repetir</button>
        <button type="button" id="inicar-camera" class="button btn confirm_ar btn-green">📷 Confirmar e baixar
            (iniciar camera)</button>
        <button class="btn botao-1 btnEsquerdo" id="fotografar" title='Tirar uma foto'> Foto </button>
        <button class="btn botao-1 btnDireito" id="cancelar-camera" title='Cancelar foto'> Cancelar</button>
        <button class="btn botao-2 btnEsquerdo2" id="enviar-foto" title='Tirar uma foto'> Enviar </button>
        <button class="btn botao-2 btnDireito2" id="repetir-foto" title='Cancelar foto'> Repetir</button>
    </section>`);

    //video.setAttribute('crossOrigin','anonymous'); //Em caso de problema com o CORS

    doc.querySelector('#inicar-camera').addEventListener('click', event => {
        iniciar(video);
        doc.body.appendChild(video);
    })

    doc.querySelector('#fotografar').addEventListener('click', event => {
        fotografar(canvas, video);
        doc.body.appendChild(canvas);
        parar(video);
    })

    doc.querySelector('#cancelar-camera').addEventListener('click', event => {
        parar(doc, video);
        fechar(video, canvas);
    })

    doc.querySelector('#enviar-foto').addEventListener('click', event => {
        salvar(doc, canvas);
    })

    doc.querySelector('#repetir-foto').addEventListener('click', event => {
        parar(doc, video);
        iniciar(video);
    })

    //Navegadores mais antigos podem não implementar mediaDevices, então definimos primeiro um objeto vazio
    let checarMediaDevices = function () {
        if (navigator.mediaDevices === undefined) {
            console.log("MediaDevice não suportado no navegador padrão");
            navigator.mediaDevices = {};
        } else {
            console.log("Podemos preparar a câmera");
        }
    };
    let checarEspacoDaTela = function () {
        if (window.screen.availHeight !== window.screen.height) {
            // alguma coisa está ocupando algum espaço na tela!
            console.log("Alguma coisa está ocupando algum espaço na tela!")
        }
    }

})


// let montar = (function (global) {
console.log("Iniciando a aplicação...");

let constraints = {
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

let iniciar = function (video) {
    console.log('Iniciando camera...')

    // console.log(video);
    //verificar e remover o elemento canvas antes de fotografar
    let canvas = document.querySelector('canvas');
    console.log('Canvas? ' + canvas);
    // let video = document.querySelector('video');
    if (canvas != null) {
        console.log('removendo canvas')
        canvas.remove();
        botoes(true);
    }
    
    (function () {
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        var constraints = {
                audio: false,
                video: {
                facingMode: 'user'
            }
        }

        navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
            video.srcObject = stream;
        });
    })(this);
    
//     video.setAttribute('muted', '');
//     video.setAttribute('playsinline', '');
//     video.setAttribute('autoplay', '');
//     video.setAttribute('crossOrigin', 'anonymous'); //Em caso de problema com o CORS
//     video.style.zIndex = 1000;
//     video.style.width = '100%';
//     video.style.height = '100%';
//     video.style.display = 'absolute';
//     video.style.top = '100px';
//     video.style.bottom = '100px';
//     video.style.left = '100px';
//     video.style.right = '100px';
//     // doc.body.appendChild(video);
//     navigator.mediaDevices.getUserMedia(constraints)
//         .then((stream) => {
//             const video = document.querySelector('video');
//             video.srcObject = stream;
//             console.log('Câmera iniciada.')

//         })
//         .catch(err => console.error('getUserMedia() falhou: ', err));
    botoes(true);

}


let fotografar = function (canvas, video) {
    console.log(canvas);
    console.log(video);
    // canvas.width = doc.body.video;
    // canvas.height = doc.body.video.width;
    // let canvas = document.getElementById('pintura-canvas');
    // let canvas = doc.createElement('canvas').setAttribute('id','pintura-canvas');
    let ctx = canvas.getContext('2d');

    // desenhando 
    ctx.beginPath(); //redefine o path (evita sobrescrever)
    ctx.drawImage(video, 0, 0);

    // document.querySelector('section').appendChild(canvas);

    // canvas.toBlob(function (blob) {
    //     const url = URL.createObjectURL(blob);
    //     // usar a URL para upload
    //     pararCamera();
    // }, 'image/jpeg', 0.95);
}

let parar = function (doc, video) {
    console.log('Parando a camera...')
    botoes(false);
    doc.querySelector('video')
        .srcObject
        .getVideoTracks()
        .forEach(track => track.stop());
    // fechar();
    video.remove();
}

let fechar = function (video, canvas) {
    console.log('Fechando a camera...');

    video.remove();
    canvas.remove();

    Array.from(document.getElementsByClassName('botao-1')).forEach(function (arg) { arg.style.display = "none" });
    Array.from(document.getElementsByClassName('botao-2')).forEach(function (arg) { arg.style.display = "none" });
}

let salvar = function (doc, canvas) {
    console.log('Parando a imagem para salvar.')
    console.log(canvas);
    let imagemSalva = doc.querySelector('canvas').toDataURL();
    console.log(imagemSalva);
    // var img = new Image();
    // img.src = imagemSalva;
    // doc.body.appendChild(img);

    return imagemSalva
}

let botoes = function (flag) {
    if (flag == true) {
        Array.from(document.getElementsByClassName('botao-1')).forEach(function (arg) { arg.style.display = "inline" })
        Array.from(document.getElementsByClassName('botao-2')).forEach(function (arg) { arg.style.display = "none" })
    } else {
        Array.from(document.getElementsByClassName('botao-1')).forEach(function (arg) { arg.style.display = "none" })
        Array.from(document.getElementsByClassName('botao-2')).forEach(function (arg) { arg.style.display = "inline" })
    }
}

let remover = function (classe) {
    Array.from(document.getElementsByClassName(classe)).forEach(function (arg) { arg.style.display = "none" });
}
