let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;

let criaMoscaTempo = 1500;

let nivel = window.location.search; 
/* search recupera tudo que está a direita da ? (incluindo o sinal)*/

nivel = nivel.replace("?", "");

if (nivel === "normal") {
  //1500 
  criaMoscaTempo = 1500;
} else if (nivel === "dificil") {
  //1000
  criaMoscaTempo = 1000;
} else if (nivel === "impossivel") {
  //750
  criaMoscaTempo = 750;
} else if ( nivel === 'beast')
  criaMoscaTempo = 400;

document.querySelector("#cronometro").innerHTML = tempo;

function ajustarTamanhoPalco() {
  altura = window.innerHeight;
  largura = window.innerWidth;
  // console.log(`altura: ${altura} e largura: ${largura}`);
}

ajustarTamanhoPalco();

let cronometro = setInterval(function () {
  tempo -= 1;
  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosca);
    //alert("Vitória");
    window.location.href = "winner.html";
  } else {
    document.querySelector("#cronometro").innerHTML = tempo;
  }
}, 1000);

function posicaoRandomica() {
  //remover mosca anterior caso exista
  if (document.getElementById("mosca")) {
    document.getElementById("mosca").remove();

    if (vidas > 4) {
      window.location.href = "endGame.html";
    } else {
      document.querySelector("#v" + vidas).src = "./Assets/coracao_vazio.png";

      vidas++;
    }
  }

  let posicaoX = Math.floor(Math.random() * largura) - 120;
  let posicaoY = Math.floor(Math.random() * altura) - 120;

  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;
  console.log(posicaoX, posicaoY);

  //criar elemento html
  let mosca = document.createElement("img");
  mosca.src = "./Assets/mosca.png";
  mosca.className = tamanhoAleatorio() + "  " + ladoAleatorio();
  mosca.style.left = posicaoX + "px";
  mosca.style.top = posicaoY + "px";
  mosca.style.position = "absolute";
  mosca.id = "mosca";
  mosca.onclick = function () {
    this.remove(); /*this referencia o elemento html da função*/
  };

  document.body.appendChild(mosca);

  //console.log(ladoAleatorio());
}

function tamanhoAleatorio() {
  let classe = Math.floor(Math.random() * 3);
  //console.log(classe);

  switch (classe) {
    case 0:
      return "mosca1";

    case 1:
      return "mosca2";

    case 2:
      return "mosca3";
  }
}

function ladoAleatorio() {
  let classe = Math.floor(Math.random() * 2);
  //console.log(classe);

  switch (classe) {
    case 0:
      return "ladoA";

    case 1:
      return "ladoB";
  }
}

let criaMosca = setInterval(function () {
  posicaoRandomica();
}, criaMoscaTempo);
