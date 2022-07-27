# Pong-P5.Js
Codigo para executar o jogo Pong no P5,JS
//variáveis da bolinha 
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20
let raio = diametro /2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis minha raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 8;
let raqueteAltura = 80;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;
let voceVenceu = "Você Venceu, Parabéns!"
let vocePerdeu = "Você Perdeu, Tente De Novo!"

//variáveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;
let venceu;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete , yRaquete);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  colisaoRaqueteBiblioteca(xRaquete , yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcarPontos();
  vencedor();
}
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
function movimentaBolinha(){
 xBolinha += velocidadeXBolinha;
 yBolinha += velocidadeYBolinha;
}
function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || 
      yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}
function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - 
    raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}
function colisaoRaqueteBiblioteca(x, y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}
function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(200, 10, 40, 20);
  fill(255)
  text(meusPontos, 220, 27);
  fill(color(255,140,0));
  rect(400, 10, 40 ,20);
  fill(255)
  text(pontosOponente, 420, 27);
}
function marcarPontos(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play()
  }
}
function vencedor(){
  if (meusPontos == 5){
    fill(255)
    textSize(25)
    text (voceVenceu,300 ,200)
    velocidadeXBolinha = 0;
    velocidadeYBolinha = 0;
    xBolinha = 300;
    yBolinha = 250;
    trilha.stop();
  }
  if (pontosOponente == 5){
    fill(255)
    textSize(25);
    text (vocePerdeu,300 , 200)
    velocidadeXBolinha = 0;
    velocidadeYBolinha = 0;
    xBolinha = 300;
    yBolinha = 250;
    trilha.stop();
  }
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
