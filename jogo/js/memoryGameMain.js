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
  }
})();

let notify = document.createElement('div');

function showNotify() {
  notify.textContent = `Nível ${unlockedLevel} desbloqueado!`
  if (levelMaxPoints == 8) {
    notify.textContent = 'Parabéns! Você venceu todos os níveis!'
  }
  notify.style.fontFamily = 'Inter'
  notify.style.textAlign = 'center'
  notify.style.fontSize = '1.2rem'
  notify.style.backgroundColor = 'white'
  notify.style.padding = '2vh 2vw'
  notify.style.border = '1px solid black'
  notify.style.position = 'fixed'
  notify.style.top = '10%'
  notify.style.left = '50%'
  notify.style.transform = 'translate(-50%, -50%)'
  notify.style.transition = '0.5s'
  notify.style.zIndex = '2'

  document.body.appendChild(notify)

  setTimeout(function() {
    notify.style.opacity = '0'
    notify.style.userSelect = 'none'
  }, 2000)
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkForMatch();
};

function checkForMatch(){
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
  isMatch ? disableCards() : unflipCards();
};

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  scoreCounter();
  resetBoard();
};

let unlockedLevel = 1
function checkCurrentLevel(levelPoints){
  if(levelPoints == 4){
    unlockedLevel = 2
  } else if (levelPoints == 5){
    unlockedLevel = 3
  } else if (levelPoints == 6){
    unlockedLevel = 4
  } else if (levelPoints == 7){
    unlockedLevel = 5
  } else if (levelPoints == 8){
    unlockedLevel = 5
  } else {
    throw(err)
  }
}

async function scoreCounter(){
  score += 1;
  if (score === levelMaxPoints) {
    checkCurrentLevel(levelMaxPoints);
    showNotify();
    scoreAppear();
  }
};

function unflipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 800);
};

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  })
})();

async function scoreAppear(){
  backScreen.style.opacity = "1";
  backScreen.style.zIndex = "1";
  await requisition()
};

cards.forEach(card => card.addEventListener('click', flipCard));

const storedAccount = localStorage.getItem('@account_logged');
const account = JSON.parse(storedAccount);
let userEmail = account.email;



async function requisition() {
  let data = { unlockedLevel, userEmail };

  const response = await fetch('http://localhost:3003/api/store/minigame1Update', {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  });

  let content = await response.json();
  console.log(content)
}

const buttonBack = document.querySelector('#button-back');
const buttonAgain = document.querySelector('#button-again');

buttonBack.addEventListener('click', function() {
  window.location.href = '../../pages/minigames.html';
});

buttonAgain.addEventListener('click', function() {
  location.reload();
});