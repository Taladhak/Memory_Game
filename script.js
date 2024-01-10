
const gameContainer = document.getElementById("game");

//  Created variables to track the selected cards
let firstCard = null;
let secondCard = null;
let isFlipping = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // Prevents more cards to be flipped if not similar
  if (isFlipping) return;
  //  Prevents flipping a card that has already been flipped
  if (event.target.classList.contains('flipped'))
    return;

  // Creating a variable to get the color class of the clicked card
  const colorclasses = event.target.classList[0];
  // Changing the background color to match the card's color
  event.target.style.backgroundColor = colorclasses;
  // indicating that a card is flipped
  event.target.classList.add('flipped');

  // Assigning a variable to the clicked cards while also changing the background color
  const clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  // Assignin the cards as the first
  if (!firstCard) {
    firstCard = clickedCard;
    firstCard.classList.add('flipped');

  } 
  // Assignin the second card if its different
  else if (firstCard && !secondCard && clickedCard !== firstCard) {
    secondCard = clickedCard;
    secondCard.classList.add('flipped');
    // Incrementing each score to corresepond each guess
    score++; 
    // Updating the score display
    updateScore();

    isFlipping = true;
  

    // Checking for a match
    setTimeout(() => {
      if (firstCard.className === secondCard.className) {
        firstCard.removeEventListener("click", handleCardClick);
        secondCard.removeEventListener("click", handleCardClick);
      } 
      //  If the cards are not a match they flip back to the original color
      else {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
      }
      // The variables reset 
      firstCard = null;
      secondCard = null;
      isFlipping = false;
    }, 1000);
  }
}

// Function to start the game
function startGame() {
  gameContainer.innerHTML = '';
  //  Reseting the score for a new game
  score = 0; 
  updateScore(); 
  updateBestScore();
  createDivsForColors(shuffle(COLORS));
  document.getElementById('restartGame').style.display = 'none'; // Hide restart button initially
}

// Event listener for the start game button
document.getElementById('startGame').addEventListener('click', function() {
  gameContainer.innerHTML = '';
  startGame();
  document.getElementById('restartGame').style.display = 'block'; // Show restart button when game starts
});

// Event listener for the restart game button
document.getElementById('restartGame').addEventListener('click', function() {
  gameContainer.innerHTML = '';
  startGame(); // Restart the game
});

// New Variable for score
let score = 0;

// Updating score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Function to update the best score 
function updateBestScore() {
  let bestScore = localStorage.getItem('bestScore');
  bestScore = bestScore ? parseInt(bestScore) : null;
  if (bestScore === null || score < bestScore) {
      localStorage.setItem('bestScore', score.toString());
      bestScore = score;
  };
  document.getElementById('bestScore').textContent = bestScore;
}

// Loading the best score from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  let bestScore = localStorage.getItem('bestScore');
  document.getElementById('bestScore').textContent = bestScore ? bestScore : '-';
});


// when the DOM loads
createDivsForColors(shuffledColors);




