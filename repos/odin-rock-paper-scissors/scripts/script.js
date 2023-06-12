function getComputerChoice(choices) {
    const keys = Object.keys(choices);
    return choices[keys[Math.floor(Math.random() * keys.length)]];
}

function getPlayerChoice(choiceName, choices) {
    return choices[choiceName];
}

function updateChoices(playerChoice, choices) {
    PLAYER.CHOICE = getPlayerChoice(playerChoice, choices);
    COMPUTER.CHOICE = getComputerChoice(choices);
}

function playRound() {
    let result;

    if (PLAYER.CHOICE.name === COMPUTER.CHOICE.weakness) {
        result = {winner: 'player', winnerObject: PLAYER.CHOICE};
    } else if (PLAYER.CHOICE.name === COMPUTER.CHOICE.advantage) {
        result = {winner: 'computer', winnerObject: COMPUTER.CHOICE};
    } else {
        result = {winner: '', winnerObject: {}};
    }

    return result;
}

function updateResultElement(roundResult, resultElement) {
    let resultText = '';
    if (roundResult.winner === 'player') {
        resultText = `The player's ${roundResult.winnerObject.name} beats the computer's ${roundResult.winnerObject.advantage}!`;
    } else if (roundResult.winner === 'computer') {
        resultText = `The computers's ${roundResult.winnerObject.name} beats the player's ${roundResult.winnerObject.advantage}!`;
    } else {
        resultText =  `It's a tie!`;
    }

    const resultPara = document.createElement('p'); 
    resultPara.textContent = resultText;
    resultElement.appendChild(resultPara);
    resultElement.scrollIntoView();
}

function clearResultElement(resultElement) {
    while (resultElement.firstChild) {
        resultElement.removeChild(resultElement.firstChild)
    }
} 

function updateScore(roundResult, scoreElement) {

    if (roundResult.winner === 'player') {
        PLAYER.SCORE += 1;
    } else if (roundResult.winner === 'computer') {
        COMPUTER.SCORE += 1;
    }

    scoreElement.textContent = `${PLAYER.SCORE}-${COMPUTER.SCORE}`;
}

function resetScore(scoreElement) {
    scoreElement.textContent = `0-0`;
    PLAYER.SCORE = 0;
    COMPUTER.SCORE = 0;
}

function checkGameForWinner() {
    return (PLAYER.SCORE === 5 || COMPUTER.SCORE === 5);
}

function showWinnerText(winnerElement) {
    if (PLAYER.SCORE > COMPUTER.SCORE) {
        winnerElement.textContent = `Player wins ${PLAYER.SCORE}-${COMPUTER.SCORE}`;
    } else {
        winnerElement.textContent = `Computer wins ${COMPUTER.SCORE}-${PLAYER.SCORE}`;
    }

    winnerElement.classList.remove('hidden');
}

function hideWinnerText(winnerElement) {
    winnerElement.classList.add('hidden');
}

function updateGameState(playerChoice, choices, scoreElement, resultElement, winnerElement) {
    updateChoices(playerChoice, choices);

    let roundResult = playRound();
    updateScore(roundResult, scoreElement, resultElement, winnerElement);
    updateResultElement(roundResult, resultElement);

    if (checkGameForWinner()) {
        showWinnerText(winnerElement);
        clearResultElement(resultElement);
        resetScore(scoreElement);
    } else {
        hideWinnerText(winnerElement);
    }
}

const choices = {
    'rock': {name: 'rock', advantage: 'scissors', weakness: 'paper'}, 
    'paper': {name: 'paper', advantage: 'rock', weakness: 'scissors'}, 
    'scissors': {name: 'scissors', advantage: 'paper', weakness: 'rock'}
};

const PLAYER = {
    SCORE: 0,
    CHOICE: {}
};

const COMPUTER = {
    SCORE: 0,
    CHOICE: {}
}

const scoreDiv = document.querySelector('.running-score');
const resultsDiv = document.querySelector('.results-display');
const winnerDiv = document.querySelector('.winner-display');

const rockButton = document.querySelector('.rock-btn');
const paperButton = document.querySelector('.paper-btn');
const scissorsButton = document.querySelector('.scissors-btn');

rockButton.addEventListener('click', () => {
    updateGameState('rock', choices, scoreDiv, resultsDiv, winnerDiv);
});

paperButton.addEventListener('click', () => {
    updateGameState('paper', choices, scoreDiv, resultsDiv, winnerDiv);
});

scissorsButton.addEventListener('click', () => {
    updateGameState('scissors', choices, scoreDiv, resultsDiv, winnerDiv);
});