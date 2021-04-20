'use strict';

const score1Element = document.getElementById('score--0');
const score2Element = document.getElementById('score--1');
const current1Element = document.getElementById('current--0');
const current2Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score1Element.textContent = 0;
  score2Element.textContent = 0;
  current1Element.textContent = 0;
  current2Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //scores at position active player?
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceElement.classList.add('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
