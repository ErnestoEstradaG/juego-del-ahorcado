
/* Se crean las variables que modificaran el DOM */
const personajeImagen = document.querySelector(".personaje-box img");
const keyboardDiv = document.querySelector(".keyboard");
const texto = document.querySelector(".texto b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

/* 
    Esta función crea los botones con las letras del abecedario. 
    Se realiza mediante la posición 97 del código ASCII que corresponde a la letra “a” y al 122 que corresponde a la letra “z”.
*/
for(let i = 97; i<= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

/*
Una vez que gane o pierda el jugador, esta función reinicia y selecciona una palabra nueva. 
*/
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    personajeImagen.src = `img/hangman-${wrongGuessCount}.svg`;
    texto.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=> ` <li class="letter "></li>`).join("");
    gameModal.classList.remove("show");
};

/*
Función que selecciona aleatoriamente del archivo palabras.js la palabra y pista a descifrar. 
*/
const getRandomWord = () => {
    const {palabra, pista} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = palabra;
    document.querySelector(".pista b").innerHTML = pista;
    resetGame();
    
}

/*
Esta función modifica la ventana modal, el cual ocupa operador ternario para colocar el mensaje e imagen de acuerdo si gana o pierde el jugador  
*/
const gameOver = (isVictory) =>{
    setTimeout(()=> {
        const modalText = isVictory ? `Encontraste la palabra:` : `La palabra era:`;
        gameModal.querySelector("img").src = `img/${isVictory ? `victory` : `lost`}.gif `;
        gameModal.querySelector("h4").innerText = `${isVictory ? `Felicidades ` : `Perdiste`} `;
        gameModal.querySelector("p").innerHTML = `${modalText} <b> ${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

/*
Función que compara la letra seleccionada con las que contiene la palabra.
También muestra la letra si es que la contiene la palabra y si no aumenta el contador de intentos fallidos. 
*/
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        wrongGuessCount++;
        personajeImagen.src = `img/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    texto.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}



getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);