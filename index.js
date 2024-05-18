document.addEventListener('DOMContentLoaded', () => {
  const words = [
      { word: 'aviò', category: 'Transports' },
      { word: 'oceà', category: 'Geografia' },
      { word: 'turista', category: 'Professions' },
      // Afegir més paraules i categories
  ];

  const maxErrors = 6;
  let selectedWord = '';
  let selectedCategory = '';
  let maskedWordArray = [];
  let usedLetters = [];
  let errors = 0;
  let username = '';

  const usernameInput = document.getElementById('username');
  const startGameBtn = document.getElementById('startGameBtn');
  const gameArea = document.getElementById('gameArea');
  const categoryElement = document.getElementById('category');
  const maskedWordElement = document.getElementById('maskedWord');
  const alphabetElement = document.getElementById('alphabet');
  const hangmanImagesElement = document.getElementById('hangmanImages');
  const gameEndMessageElement = document.getElementById('gameEndMessage');
  const playAgainBtn = document.getElementById('playAgainBtn');

  startGameBtn.addEventListener('click', startGame);
  playAgainBtn.addEventListener('click', startGame);

  function startGame() {
    username = usernameInput.value.trim();
    if (!username) {
      alert('Si us plau, introdueix un nom d\'usuari.');
      return;
    }
    resetGame();
    selectRandomWord();
    displayMaskedWord();
    displayAlphabet();
    displayCategory();
    gameArea.style.display = 'block';
    saveGameState();
  }

  function resetGame() {
    selectedWord = '';
    selectedCategory = '';
    maskedWordArray = [];
    usedLetters = [];
    errors = 0;
    maskedWordElement.innerHTML = '';
    alphabetElement.innerHTML = '';
    hangmanImagesElement.innerHTML = '';
    gameEndMessageElement.style.display = 'none';
    playAgainBtn.style.display = 'none';
  }

  function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    selectedCategory = words[randomIndex].category;
    maskedWordArray = Array(selectedWord.length).fill('_');
  }

  function displayMaskedWord() {
    maskedWordElement.textContent = maskedWordArray.join(' ');
  }

  function displayAlphabet() {
    alphabetElement.innerHTML = '';  // Clear previous buttons
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.classList.add('btn', 'btn-secondary');
      button.addEventListener('click', () => handleLetterClick(letter));
      alphabetElement.appendChild(button);
    });
  }

  function handleLetterClick(letter) {
    if (usedLetters.includes(letter)) return;
    usedLetters.push(letter);
    if (selectedWord.includes(letter)) {
      revealLetter(letter);
    } else {
      errors++;
      updateHangmanImages();
    }
    checkGameEnd();
  }

  function revealLetter(letter) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        maskedWordArray[i] = letter;
      }
    }
    displayMaskedWord();
  }

  function updateHangmanImages() {
    hangmanImagesElement.innerHTML = '';
    for (let i = 1; i <= errors; i++) {
      const img = document.createElement('img');
      img.src = `img/Penjat${i}.png`;
      hangmanImagesElement.appendChild(img);
    }
  }

  function checkGameEnd() {
    if (!maskedWordArray.includes('_')) {
      endGame(true);
    } else if (errors >= maxErrors) {
      endGame(false);
    }
    saveGameState();
  }

  function endGame(won) {
    gameEndMessageElement.style.display = 'block';
    playAgainBtn.style.display = 'block';
    if (won) {
      gameEndMessageElement.textContent = `Felicitats ${username}! Has encertat la paraula: ${selectedWord}`;
    } else {
      gameEndMessageElement.textContent = `Has perdut ${username}. La paraula era: ${selectedWord}`;
    }
    displayEducationalInfo();
  }

  function displayEducationalInfo() {
    // Aquí es pot afegir informació educativa relacionada amb la paraula encertada o no.
    // Per exemple:
    if (selectedWord === 'aviò') {
      gameEndMessageElement.innerHTML += '<p>Sabies que els avions són un dels mitjans de transport més segurs?</p>';
    }
  }

  function displayCategory() {
    categoryElement.textContent = `Categoria: ${selectedCategory}`;
  }

  function saveGameState() {
    const gameState = {
      username,
      selectedWord,
      selectedCategory,
      maskedWordArray,
      usedLetters,
      errors
    };
    localStorage.setItem('hangmanGameState', JSON.stringify(gameState));
  }

  function loadGameState() {
    const savedGameState = localStorage.getItem('hangmanGameState');
    if (savedGameState) {
      const gameState = JSON.parse(savedGameState);
      username = gameState.username;
      selectedWord = gameState.selectedWord;
      selectedCategory = gameState.selectedCategory;
      maskedWordArray = gameState.maskedWordArray;
      usedLetters = gameState.usedLetters;
      errors = gameState.errors;
      displayMaskedWord();
      displayAlphabet();
      updateHangmanImages();
      displayCategory();
      checkGameEnd();
    }
  }

  loadGameState();
});
