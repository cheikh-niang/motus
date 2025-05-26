// Motus - Le jeu de mots - JavaScript extrait
const WORD_LENGTH = 8;
const MAX_ATTEMPTS = 6;
let secretWord = '';
let currentAttempt = 0;
let currentPosition = 0;
let gameOver = false;
let isLoading = false;
document.addEventListener('DOMContentLoaded', () => {
    createGameGrid();
    createKeyboard();
    setupEventListeners();
    startNewGame();
});
function createGameGrid() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.className = 'game-row';
        row.dataset.row = i;
        for (let j = 0; j < WORD_LENGTH; j++) {
            const letterBox = document.createElement('div');
            letterBox.className = 'letter-box';
            letterBox.dataset.row = i;
            letterBox.dataset.col = j;
            row.appendChild(letterBox);
        }
        gameGrid.appendChild(row);
    }
}
function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const keys = [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['ENTER', 'W', 'X', 'C', 'V', 'B', 'N', 'BACKSPACE']
    ];
    keys.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'key';
            keyButton.textContent = key;
            keyButton.dataset.key = key;
            if (key === 'ENTER' || key === 'BACKSPACE') {
                keyButton.classList.add('special-key');
            }
            keyButton.addEventListener('click', () => handleKeyPress(key));
            keyboardRow.appendChild(keyButton);
        });
        keyboard.appendChild(keyboardRow);
    });
}
function setupEventListeners() {
    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();
        if (key === 'ENTER') {
            handleKeyPress('ENTER');
        } else if (key === 'BACKSPACE') {
            handleKeyPress('BACKSPACE');
        } else if (/^[A-Z]$/.test(key)) {
            handleKeyPress(key);
        }
    });
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        hideModal('gameOverModal');
        startNewGame();
    });
    document.getElementById('seeStatsBtn').addEventListener('click', () => {
        window.location.href = 'stats.php';
    });
    document.getElementById('helpIcon').addEventListener('click', () => {
        window.location.href = 'rules.php';
    });
}
function startNewGame() {
    fetchNewWord()
        .then(word => {
            secretWord = word;
            currentAttempt = 0;
            currentPosition = 0;
            gameOver = false;
            createGameGrid();
            const firstLetterBox = document.querySelector('.letter-box[data-row="0"][data-col="0"]');
            firstLetterBox.textContent = secretWord[0];
            firstLetterBox.classList.add('letter-correct');
            resetKeyboard();
            showMessage('');
        })
        .catch(error => {
            console.error('Erreur lors du chargement du mot:', error);
            showMessage('Erreur lors du chargement du mot. Veuillez réessayer.', 'error');
        });
}
function fetchNewWord() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const words = [
                'TABLEAUX', 'SANDALES', 'DOUDOUNE', 'ELEPHANT', 'TROUSSES',
                'POCHETTE', 'BANQUISE', 'VACANCES', 'CARTABLES', 'MONTAGNE'
            ];
            const randomWord = words[Math.floor(Math.random() * words.length)];
            resolve(randomWord);
        }, 500);
    });
}
function handleKeyPress(key) {
    if (gameOver || isLoading) return;
    if (key === 'ENTER') {
        submitAttempt();
    } else if (key === 'BACKSPACE') {
        deleteLetter();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    }
}
function addLetter(letter) {
    if (currentPosition >= WORD_LENGTH) return;
    if (currentAttempt === 0 && currentPosition === 0) {
        currentPosition = 1;
    }
    const letterBox = document.querySelector(`.letter-box[data-row="${currentAttempt}"][data-col="${currentPosition}"]`);
    letterBox.textContent = letter;
    currentPosition++;
}
function deleteLetter() {
    if (currentPosition <= 1) return;
    currentPosition--;
    const letterBox = document.querySelector(`.letter-box[data-row="${currentAttempt}"][data-col="${currentPosition}"]`);
    letterBox.textContent = '';
}
function submitAttempt() {
    if (currentPosition < WORD_LENGTH) {
        showMessage('Le mot n\'est pas complet', 'error');
        return;
    }
    let attemptWord = '';
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letterBox = document.querySelector(`.letter-box[data-row="${currentAttempt}"][data-col="${i}"]`);
        attemptWord += letterBox.textContent;
    }
    checkWordExists(attemptWord)
        .then(exists => {
            if (!exists) {
                showMessage('Ce mot n\'existe pas dans notre dictionnaire', 'error');
                return;
            }
            checkAttempt(attemptWord);
            if (attemptWord === secretWord) {
                endGame(true);
                return;
            }
            currentAttempt++;
            currentPosition = 0;
            if (currentAttempt >= MAX_ATTEMPTS) {
                endGame(false);
                return;
            }
            const nextFirstLetterBox = document.querySelector(`.letter-box[data-row="${currentAttempt}"][data-col="0"]`);
            nextFirstLetterBox.textContent = secretWord[0];
            nextFirstLetterBox.classList.add('letter-correct');
            showMessage('');
        })
        .catch(error => {
            console.error('Erreur lors de la vérification du mot:', error);
            showMessage('Erreur lors de la vérification du mot', 'error');
        });
}
function checkWordExists(word) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}
function checkAttempt(attemptWord) {
    const letterCount = {};
    for (const letter of secretWord) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
    const letterBoxes = Array.from(document.querySelectorAll(`.letter-box[data-row="${currentAttempt}"]`));
    const letterStatus = new Array(WORD_LENGTH).fill('absent');
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (attemptWord[i] === secretWord[i]) {
            letterStatus[i] = 'correct';
            letterCount[attemptWord[i]]--;
        }
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (letterStatus[i] !== 'correct' && letterCount[attemptWord[i]] > 0) {
            letterStatus[i] = 'present';
            letterCount[attemptWord[i]]--;
        }
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
        const letterBox = letterBoxes[i];
        const letter = attemptWord[i];
        const status = letterStatus[i];
        setTimeout(() => {
            if (status === 'correct') {
                letterBox.classList.add('letter-correct');
                updateKeyboardKey(letter, 'correct');
            } else if (status === 'present') {
                letterBox.classList.add('letter-present');
                updateKeyboardKey(letter, 'present');
            } else {
                letterBox.classList.add('letter-absent');
                updateKeyboardKey(letter, 'absent');
            }
        }, i * 100);
    }
}
function updateKeyboardKey(letter, status) {
    const key = document.querySelector(`.key[data-key="${letter}"]`);
    if (!key) return;
    if (status === 'correct') {
        key.classList.remove('key-present', 'key-absent');
        key.classList.add('key-correct');
    } else if (status === 'present' && !key.classList.contains('key-correct')) {
        key.classList.remove('key-absent');
        key.classList.add('key-present');
    } else if (!key.classList.contains('key-correct') && !key.classList.contains('key-present')) {
        key.classList.add('key-absent');
    }
}
function resetKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.classList.remove('key-correct', 'key-present', 'key-absent');
    });
}
function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
    messageContainer.className = 'message-container';
    if (message) {
        messageContainer.classList.add('message-visible');
        messageContainer.classList.add(`message-${type}`);
    }
    if (type === 'error') {
        setTimeout(() => {
            messageContainer.classList.remove('message-visible');
        }, 3000);
    }
}
function endGame(isWin) {
    gameOver = true;
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const attemptsSpan = document.getElementById('attempts');
    if (isWin) {
        modalTitle.textContent = 'Félicitations !';
        attemptsSpan.textContent = currentAttempt + 1;
        modalMessage.textContent = `Vous avez trouvé le mot "${secretWord}" en ${currentAttempt + 1} essai${currentAttempt === 0 ? '' : 's'}.`;
        saveGameResult(true, currentAttempt + 1);
    } else {
        modalTitle.textContent = 'Perdu !';
        modalMessage.textContent = `Le mot était "${secretWord}". Essayez encore !`;
        saveGameResult(false, MAX_ATTEMPTS);
    }
    showModal('gameOverModal');
}
function saveGameResult(isWin, attempts) {
    console.log(`Enregistrement du résultat: ${isWin ? 'Victoire' : 'Défaite'} en ${attempts} essais`);
}
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}
