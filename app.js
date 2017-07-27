/*
 GAME RULES:
 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game
 */
var scores, roundScore, activePlayer, gamePlaying, lastRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Generate a random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. Display the result.
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        console.log(dice);
        console.log(dice2);
        //3. update the round score ONLY IF the rolled number is NOT a 1
        if (dice !== 1 & checkLastScore(dice) & dice2 !== 1) {
            //add score to current score
            roundScore += dice;
            roundScore += dice2;
            lastRoll = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //change to next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //1. add current score to global score
        scores[activePlayer] += roundScore;
        //2. update the UI to reflect this
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //3.  Check if player has won the game
        if (checkForWin(scores[activePlayer])) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function checkForWin(globalScore) {
    if (globalScore >= 100) {
        gamePlaying = false;
        return true;
    } else {
        return false;
    }
}

function init() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
}

function checkLastScore(currentDice) {
    if (currentDice == 6 & lastRoll == 6) {
        return false;
    } else {
        return true;
    }
}
