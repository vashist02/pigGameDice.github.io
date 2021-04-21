'use strict';

const palyer0El = document.querySelector('.player--0');
const palyer1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  palyer0El.classList.remove('player--winner');
  palyer1El.classList.remove('player--winner');
  palyer0El.classList.add('player--active');
  palyer1El.classList.remove('player--active');
};

init();



const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  palyer0El.classList.toggle('player--active');
  palyer1El.classList.toggle('player--active');
};

///roling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {

    // Generating a randown number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //displays the dice images according to the random number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check the random number is one
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {

      // switch player if number is 1
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {

    // score to active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

      //check if player's score is greater than 100
    if (scores[activePlayer] >= 20) {

      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {

      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click',init);
