// script.js

const gameBoard = document.getElementById('gameBoard');
const startGameButton = document.getElementById('startGame');
const themeSelect = document.getElementById('theme');
const gridSizeSelect = document.getElementById('gridSize');

let firstCard, secondCard;
let lockBoard = false;
let matchCount = 0;

startGameButton.addEventListener('click', startGame);

function startGame() {
    const theme = themeSelect.value;
    const gridSize = gridSizeSelect.value;

    let cardValues = generateCardValues(theme, gridSize);
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize.charAt(0)}, 1fr)`;

    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function generateCardValues(theme, gridSize) {
    let values = [];
    const size = parseInt(gridSize.charAt(0));
    for (let i = 1; i <= (size * size) / 2; i++) {
        values.push(i, i);
    }
    values = values.sort(() => Math.random() - 0.5);
    return values;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.remove('hidden');
    this.innerText = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
        matchCount++;
        if (matchCount === (parseInt(gridSizeSelect.value.charAt(0)) ** 2) / 2) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
