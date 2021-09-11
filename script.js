'use strict';
//Testing
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1'); //faster
const curr0 = document.getElementById('current--0');
const curr1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const rollbtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const SwitchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

let scores, currentScore, activePlayer, playing;

const initialize = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;

    curr0.textContent = 0;
    curr1.textContent = 0;

    //To show and hide the dice
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
initialize();

rollbtn.addEventListener('click', function () {
    if (playing) {
        //random dice roll
        let ranDice = Math.trunc(Math.random() * 6) + 1;
        //display the dice
        dice.classList.remove('hidden');
        dice.src = `dice-${ranDice}.png`

        //check for 1 if yes -> player 2
        if (ranDice !== 1) {
            //add dice to score
            currentScore += ranDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch to next player
            SwitchPlayer();
        }
    }
})

holdBtn.addEventListener('click', function () {
    if (playing) {
        //Add curretn score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if 100
        if (scores[activePlayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            // yes finish game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        } else {
            //no-> switch player
            SwitchPlayer();
        }
    }
})
newBtn.addEventListener('click', initialize)