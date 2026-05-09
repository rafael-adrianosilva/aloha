//Principais
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const cenario = document.querySelector(".chaos");

//Corações
// const heart1 = document.querySelector(".heart");
// const heart2 = document.querySelector(".heart1");
// const heart3 = document.querySelector(".heart2");

//Decorações, "telas" e informações exibidas na tela
const estrelas = document.querySelector(".sky-stars");
const goku = document.querySelector(".goku");
const dragon = document.querySelector(".dragon");
const dragonair = document.querySelector(".dragonair");
let space = document.querySelector(".space");
let cloud = document.querySelector(".clouds")


const telaMorte = document.querySelector(".div-continuar");
const telaIncio = document.querySelector(".tela_inicio");
const gameBoard = document.querySelector(".game-board");
const infoBoard = document.querySelector(".info-board");
const pretin = document.querySelector(".pretin");
const goku_golpes = document.querySelector(".goku_golpes");
const selecao = document.querySelector(".personagens-selec");
const creditos_tela = document.querySelector(".creditos-area");

//:D
// musica  
const musica = document.getElementById('troca');
//Musica de seleção Nahyron
const musicaSelecao = document.getElementById("musicaSelecao");
const musicaJogo = document.getElementById("musicaJogo");
const moedaPega = document.getElementById("moeda");
//(Nahyron) coloquei essa variavel para controlar o personagem atual e eu poder usar depois :)
let personagemAtual = "";


let idplayer = "";

let segundos = 0;
let moedasColetadas = 0;

//Pontos e vidas ao inciar o jogo
let pontos = 0;
let lifes = 3;
const coin = document.querySelector(".coin");
const pontosTexto = document.getElementById("pontos");
const pontoTexto = document.getElementById("pontoTexto");

const matheusSprites = {
    run: "_imagens/sprites/matheus/matheus-running.gif",
    jump: "_imagens/sprites/matheus/matheus-jump.png",
    dead: "_imagens/sprites/matheus/matheus-dead.png"
};

const musicasGameplay = {
    sonic: "_media/sounds/sonic-theme.mp3",
    sonicSecreto: "_media/sounds/sonic-theme.mp3",
    shadowSecreto: "_media/sounds/sonic-theme.mp3",
    link: "_media/sounds/link-game.mp3",
    luffy: "_media/sounds/luffy-music.mp3",
    batman: "_media/sounds/batman_theme.mp3",
    mario: "_media/sounds/mario.mp3",
    marioSecreto: "_media/sounds/mario.mp3",
    marioKart: "_media/sounds/mario.mp3",
    kirby: "_media/sounds/kirby-game.mp3",
    pikachu: "_media/sounds/pikachu-game.mp3",
    matheus: "_media/sounds/hinoPalmeiras.mp3"
};


//Sumindo com algumas coisas da tela antes do jogo começar
pipe.style.display = "none";
mario.style.display = "none";
coin.style.display = "none";
infoBoard.style.display = "none";
telaMorte.style.display = "none";
pretin.style.display = "none";

var toca1 = true;
var toca2 = true;
let jogoIniciado = false;
let moedaIntervalId = null;
let pontosIntervalId = null;
let gameLoopId = null;

// FUNÇÃO SALVAR NOME DO PLAYER COLOQUEI AQUI PARA FICAR MAIS FÁCIL DE ACHAR E USAR DEPOIS

function salvarNomeEContinuar() {
    const inputNome = document.getElementById("playerNameInput");
    if (inputNome.value.trim() === "") { // Verifica se o campo está vazio
        alert("Por favor, digite um nome para continuar!");
        return;
    }
    idplayer = inputNome.value;

    document.querySelector('.name-screen').style.display = 'none';
    document.querySelector('.game-board').style.display = 'block';
}

//Já tinha antes
const jump = () => {
    if (mario.style.display === "none") {
        return;
    }

    if (!mario.classList.contains('jump')) {
        if (personagemAtual === "matheus") {
            mario.src = matheusSprites.jump;
        }

        mario.classList.add("jump");
        setTimeout(() => {
            mario.classList.remove("jump");
            if (personagemAtual === "matheus" && lifes > 0 && telaMorte.style.display === "none") {
                mario.src = matheusSprites.run;
            }
        }, 700);
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
        case " ":
            if (mario.style.display !== "none") {
                event.preventDefault();
                jump();
            }
            break;
        default:
            break;
    }
});

//Nahyron fez, funções para o sonic virar bolinha quando segurar a seta pra baixo e voltar ao normal quando soltar
function spin() {
    mario.src = "_media/gifs-principais/sonic-spinning.gif";

    musica.removeAttribute('loop');
}
//Nahyron função para o sonic voltar ao normal
function normal() {
    mario.src = "_media/gifs-principais/sonic.gif"
}

// const marioSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
// const sonicSeq = ['ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
// let marioInput = [];
// let sonicInput = [];
// const marioKartSeq = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
// const shadowSeq = ['ArrowRight', 'ArrowRight'];
// let marioKartInput = [];
// let shadowInput = [];

// Objeto para rastrear a digitação de cada sequência de código
let unlockInputs = {
    marioSecreto: [],
    sonicSecreto: [],
    marioKart: [],
    shadowSecreto: [],
    wario: [],
    // roberto: [],
    matheus: []
};

function checkUnlock(key) {
    // Definição de todos os códigos e seus alvos no HTML
    const sequences = {
        marioSecreto: { seq: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'], id: 'marioSecreto-char' },
        sonicSecreto: { seq: ['ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'], id: 'sonicSecreto-char' },
        marioKart: { seq: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], id: 'marioKart-char' },
        shadowSecreto: { seq: ['ArrowRight', 'ArrowRight'], id: 'shadowSecreto-char' },
        wario: { seq: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], id: 'wario-char' },
        // roberto: { seq: ['r', 'o', 'b', 'e', 'r', 't', 'o'], id: 'roberto-char' },
        matheus: { seq: ['p', 'a', 'l', 'm', 'e', 'i', 'r', 'a', 's'], id: 'matheus-char' }
    };

    for (const charName in sequences) {
        const data = sequences[charName];
        const currentInput = unlockInputs[charName];

        currentInput.push(key);
        if (currentInput.length > data.seq.length) {
            currentInput.shift();
        }

        // Compara a sequência digitada com a sequência correta (ignorando maiúsculas/minúsculas)
        if (currentInput.map(k => k.toLowerCase()).join('') === data.seq.map(k => k.toLowerCase()).join('')) {
            const charElement = document.getElementById(data.id);
            if (charElement && charElement.classList.contains('personagem-secreto')) {
                charElement.style.display = 'inline-block';
                charElement.classList.remove('personagem-secreto');
                alert('Novo personagem desbloqueado!');
                currentInput.length = 0; // Reseta a sequência para evitar re-desbloqueio
            }
        }
    }
}

//FUNÇÃO PARA SALVAR PONTUAÇÃO NO BANCO DE DADOS
async function salvarPontuacao(pontosFinais) {
    const dados = {
        name: idplayer,
        score: pontosFinais,
    };

    try {
        const response = await fetch('_php/salvar_pontuacao.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const resultado = await response.json();
        console.log('Resposta do servidor:', resultado.message); // Exibe a resposta no console para debug

        return resultado.message;

    } catch (error) {
        console.error('Erro ao enviar pontuação:', error);
        return "Erro de conexão com o placar.";
    }
}

// Listener de Teclado Unificado
document.addEventListener('keydown', function (e) {
    checkUnlock(e.key);
});

// Nahyron fez
//Função é executada quando o user clicar em "Selecionar Personagem" na tela de Start
//Some com a tela de Start e exibe a tela de seleção de personagens
function personagens() {

    selecao.style.display = "flex";
    telaIncio.style.visibility = "hidden";
    document.querySelector(".recarga").style.display = "flex";
    musica.src = "_media/sounds/allstar.mp3";
    cloud.style.display = "none";
    space.style.display = "flex";
    document.querySelector(".pareiOlho").style.display = "none";
    musica.volume = 0.4;
}

// Nahyron fez
// Função é executada quando o user clicar em "Olhar fundo" na tela de Start
// Some com a tela de Start e exibe a tela de fundo da seleção de personagens"

function olhar() {
    selecao.style.display = "none";
    document.querySelector(".recarga").style.display = "none";
    document.querySelector(".pareiOlho").style.display = "flex";
    musica.src = "_media/sounds/aprecieFundo.mp3";
    musica.volume = 0.4;


}

// Miguel
// Função executa uma area de creditos
function creditos() {
    creditos_tela.style.display = "flex";
    telaIncio.style.visibility = "hidden";
    document.querySelector(".recarga").style.display = "flex";
}

// Miguel
// Retorna ao menu principal do jogo
function retornar() {

    if (selecao.style.display == "flex") {
        selecao.style.display = "none";
        telaIncio.style.visibility = "visible";
        document.querySelector(".recarga").style.display = "none";
        space.style.display = "none";
        musica.src = "_media/sounds/mario.mp3";
    }

    else {
        creditos_tela.style.display = "none";
        telaIncio.style.visibility = "visible";
        document.querySelector(".recarga").style.display = "none";
    }

}


//John fez, Parafal e Nahyron fizeram algumas alteções e adições
//Só pra me poupar esforços, o nahyron que removeu o loop e mudou a musica nas condicionais de cada personagem 
//Conforme vai sendo alterado o valor no select vai executando está função
//Muda o personagem exibido na tela de Start e dentro do jogo já que define o src da classe mario com o Gif do personagem escolhido


// function mudarPersonagem() {
//     let selecao = document.getElementById("character-select").value;
//     let personagemSelecionado = document.getElementById("personagem-sel");

//     // salva o perso atual
//     personagemAtual = selecao;

//     switch (selecao) {
//         case "mario":
//             mario.src = "_media/gifs-principais/mario.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/marioDancando.gif";
//             musica.src = "_media/sounds/its_mario.mp3";
//             musica.removeAttribute('loop');

//             break;
//         case "sonic":

//             mario.src = "_media/gifs-principais/sonic.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/sonic_dance.gif";
//             mario.style.bottom = "-4px";
//             musica.src = "_media/sounds/sonicSelection.mp3";
//             musica.removeAttribute('loop');


//             //Nahyron
//             // condicional pra quando segurar a seta pra baixo, ele virar uma bolinha (sonic)

//             document.addEventListener("keydown", (event) => {
//                 switch (event.key) {
//                     case "ArrowDown":
//                         spin();
//                         break;
//                     default:
//                         break;
//                 }
//             });

//             // condicional pra quando soltar a seta pra baixo, ele virar uma bolinha (sonic)

//             document.addEventListener("keyup", (event) => {
//                 switch (event.key) {
//                     case "ArrowDown":
//                         normal();
//                         break;
//                     default:
//                         break;
//                 }
//             });



//             break;

//         case "marioSecreto":
//             mario.src = "_media/gifs-principais/mario-walking.gif";
//             personagemSelecionado.src = "_media/gifs-principais/mario-walking.gif";
//             musica.src = "_media/sounds/mario.mp3";
//             musica.removeAttribute('loop');
//             break;
//         case "sonicSecreto":
//             mario.src = "_media/gifs-principais/super-sonic.gif";
//             personagemSelecionado.src = "_media/gifs-principais/super-sonic.gif";
//             musica.src = "_media/sounds/sonic-theme.mp3";
//             musica.removeAttribute('loop');
//             break;
//         case "marioKart":
//             mario.src = "_media/gifs-principais/super-mario-kart-mario.gif";
//             personagemSelecionado.src = "_media/gifs-principais/super-mario-kart-mario.gif";
//             musica.src = "_media/sounds/mario.mp3";
//             musica.removeAttribute('loop');
//             break;
//         case "shadowSecreto":
//             mario.src = "_media/gifs-principais/shadow-the-hedgehog.gif";
//             personagemSelecionado.src = "_media/gifs-principais/shadow-the-hedgehog.gif";
//             musica.src = "_media/sounds/sonic-theme.mp3";
//             musica.removeAttribute('loop');
//             // Inverte o gif para o lado direito
//             mario.style.transform = "scaleX(-1)";
//             personagemSelecionado.style.transform = "scaleX(-1)";
//             mario.style.bottom = "-15px";
//             break;
//         case "pikachu":
//             mario.src = "_media/gifs-principais/Pikachu.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/pikachu_parado.gif";
//             musica.src = "_media/sounds/quePokemon.mp3";
//             musica.removeAttribute('loop');
//             mario.style.marginLeft = "5px";
//             break;
//         case "kirby":
//             mario.src = "_media/gifs-principais/kirby.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/kirby-nintendo.gif";
//             musica.src = "_media/sounds/kirby_hi.mp3";
//             musica.removeAttribute('loop');
//             mario.style.width = "110px";
//             // quando clicar na foto da kirby, ela vai rir
//             personagemSelecionado.addEventListener("click", (event) => {
//                 musica.src = "_media/sounds/Kirby_laught.mp3";
//             })
//             break;
//         case "SwordSkeleton":
//             mario.src = "_media/gifs-principais/skeleton.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/skeleton_Dancing.gif";
//             musica.src = "_media/sounds/esqueleto-start.mp3";
//             musica.removeAttribute('loop');
//             break;
//         case "Batman":
//             mario.src = "_media/gifs-principais/batman.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/batman_Dance.gif";
//             musica.src = "_media/sounds/sou_batman.mp3";
//             mario.style.bottom = "-2px";
//             musica.removeAttribute('loop');
//             break;
//         case "Luffy":
//             mario.src = "_media/gifs-principais/luffy.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/luffy_walk.gif";
//             musica.src = "_media/sounds/luffy-rei.mp3";
//             musica.removeAttribute('loop');
//             mario.style.width = "115px";
//             mario.style.marginLeft = "6px";
//             mario.style.bottom = "0.3px";

//             break;
//         case "Link":
//             mario.src = "_media/gifs-principais/link.gif";
//             mario.style.bottom = "-13px";
//             personagemSelecionado.src = "_media/gifs-startscreen/link_Dance.gif";
//             musica.src = "_media/sounds/link-tema.mp3";
//             mario.style.width = "135px";
//             mario.style.marginLeft = "8px";
//             musica.removeAttribute('loop');
//             break;
//         default:
//             mario.style.transform = ""; // Remove inversão se trocar de personagem
//             personagemSelecionado.style.transform = "";
//             mario.src = "_media/gifs-principais/mario.gif";
//             personagemSelecionado.src = "_media/gifs-startscreen/marioDancando.gif";
//             break;
//     }
// }
//KAUÃ

// Remova ou comente a função antiga mudarPersonagem()

document.addEventListener('DOMContentLoaded', () => {
    const personagens = document.querySelectorAll('.character-grid img');
    const marioPadrao = document.querySelector('.character-grid img[data-character="mario"]');

    // Define Mario como selecionado por padrão ao carregar
    if (marioPadrao) {
        marioPadrao.classList.add('character-selected');
        selecionarPersonagem('mario', false); // Seleciona sem fechar a tela ou dar alerta
    }

    personagens.forEach(personagem => {
        personagem.addEventListener('click', (event) => {
            // Remove a seleção de todos os outros
            personagens.forEach(p => p.classList.remove('character-selected'));

            // Adiciona a seleção ao personagem clicado
            const selecionadoEl = event.currentTarget;
            selecionadoEl.classList.add('character-selected');

            const nomePersonagem = selecionadoEl.dataset.character;
            selecionarPersonagem(nomePersonagem, true); // S
        });
    });
});

function selecionarPersonagem(selecao, interacaoUsuario) {
    // salva o perso atual
    personagemAtual = selecao;

    // Reseta estilos
    mario.style.transform = "";
    mario.style.width = "";
    mario.style.marginLeft = "";
    mario.style.bottom = "";

    switch (selecao) {
        case "mario":
            mario.src = "_media/gifs-principais/mario.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/its_mario.mp3";
            break;
        case "sonic":
            mario.src = "_media/gifs-principais/sonic.gif";
            mario.style.bottom = "-4px";
            if (interacaoUsuario) musica.src = "_media/sounds/sonicSelection.mp3";
            break;
        case "pikachu":
            mario.src = "_media/gifs-principais/Pikachu.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/quePokemon.mp3";
            mario.style.marginLeft = "5px";
            break;
        case "kirby":
            mario.src = "_media/gifs-principais/kirby.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/kirby_hi.mp3";
            mario.style.width = "110px";
            break;
        case "batman":
            mario.src = "_media/gifs-principais/batman.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/sou_batman.mp3";
            mario.style.bottom = "-2px";
            break;
        case "luffy":
            mario.src = "_media/gifs-principais/luffy.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/luffy-rei.mp3";
            mario.style.width = "115px";
            mario.style.marginLeft = "6px";
            mario.style.bottom = "0.3px";
            break;
        case "link":
            mario.src = "_media/gifs-principais/link.gif";
            mario.style.bottom = "-13px";
            if (interacaoUsuario) musica.src = "_media/sounds/link-tema.mp3";
            mario.style.width = "135px";
            mario.style.marginLeft = "8px";
            break;
        case "marioSecreto":
            mario.src = "_media/gifs-principais/mario-walking.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/mario.mp3";
            break;
        case "sonicSecreto":
            mario.src = "_media/gifs-principais/super-sonic.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/sonic-theme.mp3";
            break;
        case "marioKart":
            mario.src = "_media/gifs-principais/super-mario-kart-mario.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/mario.mp3";
            break;
        case "shadowSecreto":
            mario.src = "_media/gifs-principais/shadow-the-hedgehog.gif";
            if (interacaoUsuario) musica.src = "_media/sounds/sonic-theme.mp3";
            mario.style.transform = "scaleX(-1)";
            mario.style.bottom = "-15px";
            break;

        case "wario":
            mario.src = "_media/wario.gif";
            mario.style.transform = "scaleX(-1)";
            // Adicione um som para o wario se tiver
            break;
        case "roberto":
            mario.src = "_media/gifs-principais/robertogirando.gif";
            mario.style.transform = "scaleX(-1)";
            mario.style.width = "150px";
            break;
        case "matheus":
            mario.src = matheusSprites.run;
            mario.style.transform = "scaleX(1)";
            mario.style.width = "150px";
            if (interacaoUsuario) musica.src = "_media/sounds/hinoPalmeiras.mp3";
            break;

        default:
            mario.src = "_media/gifs-principais/mario.gif";
            break;
    }

    if (interacaoUsuario) {
        musica.removeAttribute('loop');
        musica.play();
    }
}

// Matheus com adições e melhorias de: Parafal (Adicionou mais personagens) e João Pedro (fez o if dos bonecos mortos)
//Função é executada quando o user clicar em "sim" na telaMorte, caso ele clique em "não" a página será recarregada
//Some com a tela de morte, volta o cano
function tiraVida() {
    lifes--; // Reduz 1 vida
    renderizarVidas(); // Redesenha os corações na tela

    if (lifes > 0) {
        // Se ainda há vidas, o jogo continua
        telaMorte.style.display = "none";
        pipe.style.display = "flex";
        mario.style.display = "flex";
        coin.style.display = "flex";
        infoBoard.style.display = "flex";
    } else {
        musica.src = '_media/sounds/marioDeath.mp3';
        musica.removeAttribute('loop'); //remove o loop do som morrendo
        lifes--;
        //Aqui decidi tirar o infoBoard porque já acabou o game, não tem como voltar...
        infoBoard.style.display = "none";
        mario.style.display = "flex";
        pipe.style.display = "none";
        coin.style.display = "none";
        pararLoopsDoJogo();
        //Armazeno o conteudo html do elemento com id "pontos", e exibo na tela de morte com a tag <p>, coloquei um <br> e um botão também
        const totalPontos = document.getElementById("pontos").innerHTML;
        telaMorte.innerHTML = "<p>Infelizmente você perdeu todas suas vidas</p><br><p>Pontos: " + totalPontos + "</p><button onclick='window.location.reload()'>Tentar Novamente</button>";
        //Exibo a telaMorte
        telaMorte.style.display = "flex";

        salvarPontuacao(totalPontos).then(mensagemDoServidor => {
            telaMorte.innerHTML = `<p>Fim de Jogo!</p><p>Pontos: ${totalPontos}</p><p style="font-size: 14px; margin-top: 10px;">${mensagemDoServidor}</p><button onclick='window.location.reload()'>Jogar Novamente</button>`;
            telaMorte.style.display = "flex";
        });

        //Isso aqui já tinha
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        //Verifico qual o gif usado, baseado nisso coloco uma imagem de morte conforme o personagem que está sendo usado
        //João Pedro fez, Parafal só adicionou mais
        //Nahyron e rafael arrumaram os personagens em relação ao tamanho e a posição no chão na tela de morte
        if (mario.src.match("_media/gifs-principais/Pikachu.gif")) {
            mario.src = "_imagens/deaths/pikachu_death.png";
            musica.src = "_media/sounds/retired_Sound_pikachu.mp3";
            mario.style.width = "180px";
            mario.style.marginLeft = "50px";
            mario.style.bottom = "-10px";
        } else if (mario.src.match("_media/gifs-principais/sonic.gif")) {
            mario.src = "_imagens/deaths/sonic_death.png";
            musica.src = "_media/sounds/sonic_Death_sound.mp3";
            mario.style.width = "97px";
            mario.style.marginLeft = "50px";
            //Até a linha de cima era do Matheus sem os ajustes de tamanho
        } else if (mario.src.match("_media/gifs-principais/kirby.gif")) {
            mario.src = "_imagens/deaths/kirby-sleeping.gif";
            musica.src = "_media/sounds/kirby_Death.mp3";
            mario.style.width = "125px";
            mario.style.marginLeft = "50px";
            mario.style.bottom = "-14px";
        } else if (mario.src.match("_media/gifs-principais/skeleton.gif")) {
            mario.src = "_imagens/deaths/skeleton_Death.gif";
            musica.src = "_media/sounds/skeleton_Death.mp3";
            mario.style.width = "85px";
            mario.style.marginLeft = "50px";
            mario.style.bottom = "-6px";
        } else if (mario.src.match("_media/gifs-principais/batman.gif")) {
            mario.src = "_imagens/deaths/batman_Death.gif";
            musica.src = "_media/sounds/batman_Death.mp3";
            mario.style.width = "150px";
            mario.style.marginLeft = "15px";
            mario.style.bottom = "-13px";
        } else if (mario.src.match("_media/gifs-principais/luffy.gif") || mario.src.match("_media/gifs-principais/luffyGear.gif")) {
            mario.src = "_imagens/deaths/luffyDeath.png";
            musica.src = "_media/sounds/luffy_Death.mp3";
            mario.style.width = "110px";
            mario.style.bottom = "-9px";
            mario.style.marginLeft = "50px";
        } else if (mario.src.match("_media/gifs-principais/link.gif")) {
            mario.src = "_imagens/deaths/link_Death.png";
            musica.src = "_media/sounds/zelda_GameOver.mp3";
            mario.style.width = "110px";
            mario.style.marginLeft = "50px";

        } else if (mario.src.match("_media/gifs-principais/super-sonic.gif")) {
            mario.src = "_imagens/deaths/sonic_death.png";
            musica.src = "_media/sounds/sonic_Death_sound.mp3";
            mario.style.width = "110px";
            mario.style.marginLeft = "50px";

        } else if (mario.src.match("_media/gifs-principais/shadow-the-hedgehog.gif")) {
            mario.src = "_imagens/deaths/sonic_death.png";
            musica.src = "_media/sounds/sonic_Death_sound.mp3";
            mario.style.width = "110px";
            mario.style.marginLeft = "50px";
            mario.style.bottom = "0px";
        } else if (personagemAtual == "matheus" || mario.src.match("matheus-running.gif") || mario.src.match("matheus-jump.png")) {
            mario.src = matheusSprites.dead;
            mario.style.width = "180px";
            mario.style.marginLeft = "35px";
            mario.style.bottom = "-8px";
        } else {
            mario.src = "_imagens/deaths/mario_death.png";
            mario.style.marginLeft = "50px";
            mario.style.width = "80px";
        }
    }
}


function renderizarVidas() {
    const lifesContainer = document.querySelector('.lifes');
    lifesContainer.innerHTML = '';

    for (let i = 0; i < lifes; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = '_media/corazon-pixel.gif';
        heartImg.classList.add('heart-icon'); // Usaremos uma classe genérica
        lifesContainer.appendChild(heartImg);
    }
}

function criarMoeda() {
    const gameBoard = document.querySelector('.game-board');
    const novaMoeda = document.createElement('img');
    novaMoeda.src = '_imagens/coin.png';
    novaMoeda.classList.add('coin');

    const alturaAleatoria = Math.random() * 150 + 50; // Aparece entre 50px e 200px de altura
    novaMoeda.style.bottom = `${alturaAleatoria}px`;

    gameBoard.appendChild(novaMoeda);

    setTimeout(() => {
        novaMoeda.remove();
    }, 5000); // 5 segundos é tempo suficiente para a moeda sair da tela (eu acho)
}

//Aqui é um monstro (NO GERAL) cada um fez uma parte ou mexeu em uma que já existia :D
function elementoVisivel(elemento) {
    if (!elemento) {
        return false;
    }

    const estilo = window.getComputedStyle(elemento);
    const rect = elemento.getBoundingClientRect();
    return estilo.display !== "none" && estilo.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
}

function reduzirRect(rect, margem = {}) {
    return {
        left: rect.left + (margem.left || 0),
        right: rect.right - (margem.right || 0),
        top: rect.top + (margem.top || 0),
        bottom: rect.bottom - (margem.bottom || 0)
    };
}

function colidiu(elementoA, elementoB, margemA = {}, margemB = {}) {
    if (!elementoVisivel(elementoA) || !elementoVisivel(elementoB)) {
        return false;
    }

    const rectA = reduzirRect(elementoA.getBoundingClientRect(), margemA);
    const rectB = reduzirRect(elementoB.getBoundingClientRect(), margemB);

    return rectA.left < rectB.right &&
        rectA.right > rectB.left &&
        rectA.top < rectB.bottom &&
        rectA.bottom > rectB.top;
}

function mostrarFeedbackMoeda() {
    pontoTexto.style.visibility = 'visible';
    pontoTexto.style.animation = 'none';
    void pontoTexto.offsetWidth;
    pontoTexto.style.animation = 'texto-moeda 0.8s ease-out';

    setTimeout(() => {
        pontoTexto.style.visibility = 'hidden';
        pontoTexto.style.animation = 'none';
    }, 800);
}

function pararLoopsDoJogo() {
    clearInterval(moedaIntervalId);
    clearInterval(pontosIntervalId);
    clearInterval(gameLoopId);
    moedaIntervalId = null;
    pontosIntervalId = null;
    gameLoopId = null;
}

function iniciarGame() {
    if (jogoIniciado) {
        return;
    }

    jogoIniciado = true;
    gameBoard.classList.remove("stage-sunset", "stage-night");

    gameBoard.style.height = "95vh";
    gameBoard.style.borderBottom = "15px solid rgb(35, 160, 35)";

    document.body.style.backgroundColor = "rgb(150, 84, 8)";
    const musicaDoPersonagem = musicasGameplay[personagemAtual];
    if (musicaDoPersonagem) {
        musica.src = musicaDoPersonagem;
    }

    //Nahyron
    // coloca a música da gameplay
    if (personagemAtual == "sonic") {
        musica.src = "_media/sounds/sonic-theme.mp3";
    }
    if (personagemAtual == "sonicSecreto") {
        musica.src = "_media/sounds/sonic-theme.mp3";
    }
    if (personagemAtual == "shadowSecreto") {
        musica.src = "_media/sounds/sonic-theme.mp3";
    }
    if (personagemAtual == "Link") {
        musica.src = "_media/sounds/link-game.mp3";
    }
    if (personagemAtual == "Luffy") {
        musica.src = "_media/sounds/luffy-music.mp3";
    }
    if (personagemAtual == "Batman") {
        musica.src = "_media/sounds/batman_theme.mp3";
    }
    if (personagemAtual == "mario") {
        musica.src = "_media/sounds/mario.mp3";
    }
    if (personagemAtual == "marioSecreto") {
        musica.src = "_media/sounds/mario.mp3";
    }
    if (personagemAtual == "kirby") {
        musica.src = "_media/sounds/kirby-game.mp3";
    }
    if (personagemAtual == "pikachu") {
        musica.src = "_media/sounds/pikachu-game.mp3";
    }

    //João adicionou
    if (personagemAtual == "marioKart") {
        musica.src = "_media/sounds/mario.mp3";
    }
    if (personagemAtual == "SwordSkeleton") {
        musica.src = "_media/sounds/esqueleto-tema.mp3";
    }

    //Sumo com a tela de Start, apareço com as informações (vida e pontos), o cano e o "mario"
    telaIncio.style.display = "none";
    infoBoard.style.display = "flex";
    pipe.style.display = "flex";
    mario.style.display = "flex";
    coin.style.display = "flex";

    document.querySelector('.coin').style.display = 'none';

    // Inicia o gerador de moedas para criar uma a cada 3 segundos
    moedaIntervalId = setInterval(criarMoeda, 3000);
    //aq eu renderizo as vidas
    renderizarVidas();



    //Matheus
    //Isso aqui virifica se o display é "none", se for ele ganha pontos e exibe no elemento com id "pontos"
    //Sem isso o user podia só deixar lá a telaMorte aberta e ir ganhando pontos infinitos... agora ele tem que escolher ou "sim" ou "não", se sim e ele tiver vidas ok, caso contrário recarrega a página.
    pontosIntervalId = setInterval(() => {
        if (telaMorte.style.display.match("none")) {
            pontos++;
            pontosTexto.innerHTML = pontos;
        }
    }, 100)




    //Começou com Matheus, mas acabou que o Parafal e Nahyron mexeram bastante para melhorar, a principio a moeda tava bem zoada depois ficou muito boa
    //Validar "colisão" com a moeda, se arrelou + 500 pontos
    // setInterval(() => {
    //     if (coin.style.display !== "none") {
    //         const coinPosition = coin.offsetLeft;
    //         const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
    //         if (coinPosition <= 120 && coinPosition > 0 && marioPosition >= 120 && !coinCollected) {
    //             pontos += 100;
    //             //Parafal e Nahyron
    //             coin.style.display = "none";
    //             pontoTexto.style.visibility = 'visible';
    //             pontoTexto.style.animation = 'texto-moeda 2.15s infinite linear';
    //             moedaPega.play();
    //             coinCollected = true;
    //             setTimeout(() => {
    //                 coin.style.display = "block";
    //                 coinCollected = false;
    //                 pontoTexto.style.visibility = 'hidden';
    //                 pontoTexto.style.animation = 'none';
    //             }, 2000); // 2 segundos para reaparecer
    //         }
    //     }
    // }, 100);

    //CODIGO ANTIGO DA MOEDA, DEPOIS DO TESTE EU APAGO

    //Essa parte no geral já tinha mas é outro monstro, todo mundo mexeu um pouco
    //Essa parte no geral já tinha mas é outro monstro, todo mundo mexeu um pouco
    gameLoopId = setInterval(() => {
        // =======================================================
        //     NOVA LÓGICA DE COLISÃO COM MÚLTIPLAS MOEDAS 3000 ULTRA HD KAUÃ GAMEPLA
        // // =======================================================
        document.querySelectorAll('.coin').forEach((moeda) => {
            if (!elementoVisivel(moeda)) {
                return;
            }

            if (colidiu(mario, moeda, { left: 34, right: 34, top: 24, bottom: 8 }, { left: 8, right: 8, top: 8, bottom: 8 })) {
                moeda.remove(); // Remove a moeda coletada
                pontos += 25;
                moedasColetadas++;
                pontosTexto.innerHTML = pontos;
                mostrarFeedbackMoeda();
                moedaPega.currentTime = 0;
                moedaPega.play();

                // A cada 10 moedas, ganha uma vida
                if (moedasColetadas % 10 === 0 && moedasColetadas > 0) {
                    lifes++;
                    renderizarVidas(); // Atualiza a exibição de vidas
                }
            }
        });

        //Parafal
        // Se todas as condições forem verdadeiras, troca o gif para o luffyGear (ele está dentro do loop principal pois é onde o jogo vai rodando constantemente)

        if (
            mario.src.includes("luffy.gif") && // Está usando o gif do Luffy normal
            pontos >= 400 && // Pontuação mínima atingida
            !mario.src.includes("luffyGear.gif")) // Ainda não está com o gif do Gear
        {
            mario.src = "_media/gifs-principais/luffyGear.gif"; // Troca para o gif do Luffy Gear
            musica.src = "_media/sounds/luffy-song-gear-five.mp3";
            mario.style.width = '200px';
        }

        //Matheus e Nahyron, Parafal adicionou músicas e alterou as velocidades de acordo com a dificuldade
        //Dificuldade baseada na qntd de pontos, deixando a animação do pipe mais rápida
        //Também muda o fundo e adiciona alguns pequenos detalhes
        if (pontos >= 350) {
            pipe.style.animationDuration = "1.08s";
        }
        if (pontos >= 500) {
            pipe.style.animationDuration = "0.98s";
            gameBoard.classList.add("stage-sunset");
            goku.style.display = "flex";
            goku_golpes.style.display = "none";
        }
        if (pontos >= 650) {
            if (toca1 == true) {
                musica.src = "_media/sounds/hardDifficulty.mp3";
                toca1 = false;
            }
            pipe.style.animationDuration = "0.78s";
            gameBoard.classList.add("stage-night");
            document.getElementById("pontos").style.color = 'white';
            pontoTexto.style.color = 'white';
            estrelas.style.display = "flex";
            dragon.style.display = "flex";
            pretin.style.display = "flex";
            goku.style.display = "none";
            dragonair.style.display = "none";
        }
        // if (pontos >= 100000) {
        //     cloud.style.animationDuration = "0.2s";
        //     estrelas.style.animationDuration = "0.1s";
        //     lifes = 100000000000000;
        //     pipe.style.animationDuration = "0.1s";
        //     coin.style.animationDuration = "0.1s";
        //     coin.style.display = "none";
        // }
        // if (pontos >= 100050 && pontos <= 100500) {
        //     document.querySelector(".made-in-heaven").style.display = "flex";
        //     if (toca2 == true) {
        //         musica.src = "_media/sounds/madeinheaven.mp3";
        //         musica.removeAttribute("loop");
        //         toca2 = false;
        //     }
        //     coin.style.display = "none";
        //     pipe.style.display = "none";
        //     mario.style.display = "none";
        //     gameBoard.style.borderBottom = "none";
        //     if (pontos >= 1060 || pontos >= 95145) {
        //         window.location.reload(true);
        //     }
        // }


        //Verifica se o "Mario" arrelou no cano se sim aparece a tela de morte e some com o cano
        if (colidiu(mario, pipe, { left: 42, right: 35, top: 30, bottom: 10 }, { left: 12, right: 12, top: 8, bottom: 0 }) && lifes > 0) {
            telaMorte.style.display = "flex";
            pipe.style.display = "none";
            mario.style.display = "none";
            coin.style.display = "none";
            infoBoard.style.display = "none";
        }
    }, 10);

    //Não faço ideia de quem digitou essa parte
    musica.loop = true;
    musica.volume = 0.5;
    musica.play();

}

