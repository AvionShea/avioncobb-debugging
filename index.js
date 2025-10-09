const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}
hideAllMessages();

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

setup();

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  if (guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
  } else {
    if (guess === targetNumber) {
      attempts = attempts + 1;
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You've made ${attempts} guess(es)`;

      correctMessage.style.display = '';
      tooHighMessage.style.display = 'none';
      tooLowMessage.style.display = 'none';

      submitButton.disabled = true;
      guessInput.disabled = true;

    } else if (guess !== targetNumber) {
      attempts = attempts + 1;
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
        tooHighMessage.style.display = 'none';
      } else {
        tooHighMessage.style.display = '';
        tooLowMessage.style.display = 'none';
      }

      const remainingAttempts = maxNumberOfAttempts - attempts;

      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You've guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

      // Reset number of attempts
      if (attempts === maxNumberOfAttempts) {
        submitButton.disabled = true;
        guessInput.disabled = true;
        attempts = 0;
      }
    }
  }
  guessInput.value = '';

  resetButton.style.display = '';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
