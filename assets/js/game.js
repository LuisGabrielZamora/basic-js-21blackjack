// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
const types = ['C', 'D', 'H', 'S']
const specialCards = ['A', 'J', 'Q', 'K']
let playerPoints = 0, computerPoints = 0

const getButton = document.querySelector('#btnGet');
const newButton = document.querySelector('#btnNew');
const stopButton = document.querySelector('#btnStop');

const smallTag = document.querySelectorAll('small');
const playerDivCards = document.querySelector('#card-player');
const computerDivCards = document.querySelector('#card-terminator');

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type)
    }
  }

  for (let type of types) {
    for (let specialCard of specialCards) {
      deck.push(specialCard + type)
    }
  }

  deck = _.shuffle(deck)
  return deck

}
createDeck()

const getCardToTable = () => {

  if (deck.length === 0) {
    throw 'Not exist cards in Deck'
  }

  const card = deck.pop()
  return card

}

const cardValue = (card) => {

  const value = card.substring(0, card.length - 1)
  return (isNaN(value)) ?
    (value === 'A') ? 11 : 10
    : value * 1

};

const computerTime = (minPoints) => {

  do {

    const card = getCardToTable();
    computerPoints = computerPoints + cardValue(card);

    smallTag[2].innerText = computerPoints;

    const cardImg = document.createElement('img');
    cardImg.src = `assets/cartas/${card}.png`;
    cardImg.classList.add('black-jack-card');
    computerDivCards.append(cardImg);

    if(minPoints > 21) {
      break;
    }

  } while ((computerPoints < minPoints) && (minPoints < 21));

  setTimeout(() => {
    if(computerPoints === minPoints) {
      alert('Nadie gana :(');
    } else if(minPoints > 21) {
      alert('Computadora gana');
    } else if(computerPoints > 21) {
      alert('Jugador Gana!!!');
    } else if (minPoints === 21) {
      alert('Jugador Gana!!!');
    } else {
      alert('Computadora gana');
    }
  }, 100);

}

getButton.addEventListener('click', () => {

  const card = getCardToTable();
  playerPoints = playerPoints + cardValue(card);

  smallTag[1].innerText = playerPoints;

  const cardImg = document.createElement('img');
  cardImg.src = `assets/cartas/${card}.png`;
  cardImg.classList.add('black-jack-card');
  playerDivCards.append(cardImg);

  if (playerPoints > 21) {

    console.warn('Uppssss, perdiste!!!!');
    getButton.disabled = true;
    stopButton.disabled = true;
    computerTime(playerPoints);

  } else if (playerPoints === 21) {

    console.warn('Ganasteeee!!!!!');
    getButton.disabled = true;
    stopButton.disabled = true;
    computerTime(playerPoints);

  }

});

stopButton.addEventListener('click', () => {

  getButton.disabled = true;
  stopButton.disabled = true;

  computerTime(playerPoints);

});

newButton.addEventListener('click', () => {

  console.clear();

  deck = [];
  createDeck();

  playerPoints = 0; computerPoints = 0;

  smallTag[1].innerText = '0';
  smallTag[2].innerText = '0';

  computerDivCards.innerHTML = '';
  playerDivCards.innerHTML = '';

  getButton.disabled = false;
  stopButton.disabled = false;

});