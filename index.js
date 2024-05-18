// Paraulas i categories
const words = [
  { word: "muntanya", category: "geografia" },
  { word: "oceà", category: "geografia" },
  { word: "pols", category: "transport" },
  // Més paraules i categories aquí...
];

// Funció per obtenir una paraula aleatòria del conjunt
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Inicia un nou joc
function startGame() {
  const username = document.getElementById("username").value;
  if (username === "") {
    alert("Si us plau, introdueix el teu nom d'usuari.");
    return;
  }

  const hangmanImages = document.getElementById("hangman-images");
  hangmanImages.innerHTML = ""; // Reinicia les imatges del penjat

  const wordObj = getRandomWord();
  const word = wordObj.word;
  const category = wordObj.category;

  document.getElementById("category").innerHTML = `Categoria: ${category}`;

  const wordMask = document.getElementById("word-mask");
  wordMask.innerHTML = ""; // Reinicia la màscara de la paraula

  for (let i = 0; i < word.length; i++) {
    wordMask.innerHTML += `<span class="letter-mask">_</span>`;
  }

  const letters = document.getElementById("letters");
  letters.innerHTML = ""; // Reinicia les lletres disponibles

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    letters.innerHTML += `<button class="btn btn-secondary letter-btn" onclick="selectLetter('${letter}')">${letter}</button>`;
  }

  // Inicialitza les dades locals
  localStorage.setItem("username", username);
  localStorage.setItem("word", word);
  localStorage.setItem("category", category);
  localStorage.setItem("hangmanState", 0); // Inicia el penjat amb 0 errors
}

// Funció per seleccionar una lletra
function selectLetter(letter) {
  const word = localStorage.getItem("word");
  const wordMask = document.getElementById("word-mask");
  const hangmanImages = document.getElementById("hangman-images");
  const letters = document.getElementsByClassName("letter-btn");

  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        const letterMask = wordMask.getElementsByClassName("letter-mask")[i];
        letterMask.innerHTML = letter;
      }
    }
  } else {
    const hangmanState = parseInt(localStorage.getItem("hangmanState"));
    hangmanImages.innerHTML += `<img src="img/Penjat${
      hangmanState + 1
    }.png" alt="Penjat ${hangmanState + 1}">`;

    if (hangmanState >= 5) {
      endGame(false);
      return;
    }

    localStorage.setItem("hangmanState", hangmanState + 1);
  }

  // Desactiva la lletra seleccionada
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].innerHTML === letter) {
      letters[i].disabled = true;
      break;
    }
  }

  // Comprova si s'ha guanyat el joc
  if (!wordMask.innerHTML.includes("_")) {
    endGame(true);
  }
}

// Funció per finalitzar el joc
function endGame(win) {
  const result = document.getElementById("result");
  const playAgainBtn = document.getElementById("play-again-btn");
  const word = localStorage.getItem("word");
  const category = localStorage.getItem("category");

  if (win) {
    result.innerHTML = `<h3>Enhorabona, has guanyat!</h3>`;
  } else {
    result.innerHTML = `<h3>Ho sentim, has perdut.</h3>`;
  }

  result.innerHTML += `<p>La paraula era: ${word}</p>`;
  result.innerHTML += `<p>Informació educativa sobre ${word} (${category})</p>`;

  playAgainBtn.style.display = "block";
}

// Event Listener per al botó de començar joc
document.getElementById("start-btn").addEventListener("click", startGame);

// Event Listener per al botó de tornar a jugar
document
  .getElementById("play-again-btn")
  .addEventListener("click", function () {
    localStorage.clear(); // Esborra les dades locals
    location.reload(); // Recarrega la pàgina per començar un nou joc
  });

// Restaura l'estat del joc si és obert
window.onload = function () {
  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    document.getElementById("username").value = savedUsername;
  }

  const savedWord = localStorage.getItem("word");
  const savedCategory = localStorage.getItem("category");
  const hangmanState = localStorage.getItem("hangmanState");

  if (savedWord && savedCategory && hangmanState) {
    document.getElementById(
      "category"
    ).innerHTML = `Categoria: ${savedCategory}`;

    const wordMask = document.getElementById("word-mask");
    const hangmanImages = document.getElementById("hangman-images");
    const letters = document.getElementsByClassName("letter-btn");

    for (let i = 0; i < savedWord.length; i++) {
      const letter = savedWord[i];
      if (wordMask.getElementsByClassName("letter-mask")[i].innerHTML === "_") {
        wordMask.innerHTML += `<span class="letter-mask">_</span>`;
      } else {
        wordMask.innerHTML += `<span class="letter-mask">${letter}</span>`;
      }
    }

    for (let i = 0; i < hangmanState; i++) {
      hangmanImages.innerHTML += `<img src="img/Penjat${
        i + 1
      }.png" alt="Penjat ${i + 1}">`;
    }

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i].innerHTML;
      if (savedWord.includes(letter)) {
        letters[i].disabled = true;
      }
    }
  }
};
