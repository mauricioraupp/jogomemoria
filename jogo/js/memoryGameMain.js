const cards = document.querySelectorAll(".card");
const backScreen = document.querySelector("#back-screen");
let documentTitle = document.title;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let levelMaxPoints;

(function checkDocument(){
  if (documentTitle === "Jogo da memória: Nível 1") {
    levelMaxPoints = 4;
  } else if (documentTitle === "Jogo da memória: Nível 2") {
    levelMaxPoints = 5;
  } else if (documentTitle === "Jogo da memória: Nível 3") {
    levelMaxPoints = 6;
  } else if (documentTitle === "Jogo da memória: Nível 4") {
    levelMaxPoints = 7;
  } else if (documentTitle === "Jogo da memória: Nível 5") {
    levelMaxPoints = 8;
  } else if (documentTitle === "Jogo da memória: Nível 6") {
    levelMaxPoints = 9;
  }
})();

function flipCard(event) {
  const card = event.target.closest('.card'); // Encontrar o card mais próximo
  if (!card) return;

  const backFace = card.querySelector('.back-face');
  const name = backFace ? backFace.name : card.name;
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch(name);
}

function checkForMatch(name){
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
  isMatch ? disableCards(name) : unflipCards();
}

function disableCards(name){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  console.log(name);
  scoreCounter();
  resetBoard();
  placeName(name);
}

function placeName(name){
  let notify2 = document.createElement('div');
  notify2.textContent = `${name} ✔️`;
  notify2.style.fontFamily = 'Inter';
  notify2.style.textAlign = 'center';
  notify2.style.fontSize = 'clamp(1rem, 1.5vw, 1.5rem)';
  notify2.style.fontWeight = '700';
  notify2.style.backgroundColor = 'rgb(40,40,40)';
  notify2.style.color = 'white';
  notify2.style.padding = '2vh 2vw';
  notify2.style.border = '3px solid #25ad25';
  notify2.style.boxShadow = 'rgba(0, 0, 0, 0.5) 0 0 30px 10px';
  notify2.style.borderRadius = '6px';
  notify2.style.position = 'fixed';
  notify2.style.top = '10%';
  notify2.style.left = '50%';
  notify2.style.transform = 'translate(-50%, -50%)';
  notify2.style.transition = '0.5s';
  notify2.style.zIndex = '2';

  document.body.appendChild(notify2);

  setTimeout(function() {
    notify2.style.opacity = '0';
    notify2.style.userSelect = 'none';
  }, 2000);
}

let unlockedLevel = 1;
function checkCurrentLevel(levelPoints){
  if(levelPoints == 4){
    unlockedLevel = 2;
  } else if (levelPoints == 5){
    unlockedLevel = 3;
  } else if (levelPoints == 6){
    unlockedLevel = 4;
  } else if (levelPoints == 7){
    unlockedLevel = 5;
  } else if (levelPoints == 8){
    unlockedLevel = 5;
  } else if (levelPoints == 9){
    unlockedLevel = 6;
  } else {
    throw(err);
  }
}

async function scoreCounter(){
  score += 1;
  if (score === levelMaxPoints) {
    checkCurrentLevel(levelMaxPoints);
    scoreAppear();
  }
}

function unflipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function scoreAppear(){
  setTimeout(function(){
    backScreen.style.opacity = "1";
    backScreen.style.zIndex = "1";
  }, 2000);
}

const buttonBack = document.querySelector('#button-back');
const buttonAgain = document.querySelector('#button-again');

buttonBack.addEventListener('click', function(){
  location.reload();
});

if(buttonAgain){
  buttonAgain.addEventListener('click', function(){
    window.location.href = '../../index.html';
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));

const configScreen = document.querySelector('#back');

document.querySelector("#backmenu").addEventListener('click', function(){
  window.location.href = '../../index.html';
});
document.querySelector("#closetab").addEventListener('click', function(){
  configScreen.style.opacity = "0";
  configScreen.style.zIndex = "-1";
});

document.querySelector('#config').addEventListener('click', function(){
  configScreen.style.opacity = "1";
  configScreen.style.zIndex = "1";
});
