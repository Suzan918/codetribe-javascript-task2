class MemoryGame {
    constructor() {
        this.gameBoard = document.querySelector('.game-board');
        this.matchesDisplay = document.getElementById('matches');
        this.restartBtn = document.getElementById('restart-btn');
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLocked = false;

        this.initializeGame();
        this.addEventListeners();
    }

    initializeGame() {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const cardValues = [...letters, ...letters];
        
        this.shuffleArray(cardValues);

        this.gameBoard.innerHTML = '';
        this.matchedPairs = 0;
        this.matchesDisplay.textContent = '0';

        cardValues.forEach((letter, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = letter;
            card.dataset.index = index;
            this.gameBoard.appendChild(card);
        });

        this.cards = Array.from(document.querySelectorAll('.card'));
    }

    addEventListeners() {
        this.gameBoard.addEventListener('click', (e) => this.handleCardClick(e));
        this.restartBtn.addEventListener('click', () => this.initializeGame());
    }

    handleCardClick(e) {
        const clickedCard = e.target;

        if (!clickedCard.classList.contains('card') || 
            clickedCard.classList.contains('flipped') || 
            clickedCard.classList.contains('matched') || 
            this.isLocked ||
            this.flippedCards.length >= 2) {
            return;
        }

        this.flipCard(clickedCard);

        this.flippedCards.push(clickedCard);

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    flipCard(card) {
        card.classList.add('flipped');
        card.textContent = card.dataset.value;
    }

    unflipCard(card) {
        card.classList.remove('flipped');
        card.textContent = '';
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.value === card2.dataset.value;

        if (match) {
            this.handleMatch(card1, card2);
        } else {
            this.handleMismatch(card1, card2);
        }
    }

    handleMatch(card1, card2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.matchedPairs++;
        this.matchesDisplay.textContent = this.matchedPairs.toString();
        this.flippedCards = [];

        if (this.matchedPairs === 8) {
            setTimeout(() => {
                alert('Congratulations! You won the game!');
            }, 500);
        }
    }

    handleMismatch(card1, card2) {
        this.isLocked = true;
        setTimeout(() => {
            this.unflipCard(card1);
            this.unflipCard(card2);
            this.isLocked = false;
            this.flippedCards = [];
        }, 1000);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
}); 