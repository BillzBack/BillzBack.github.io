// JavaScript code for the game
var gameArea = null;
var orbs = [];
var score = 0;
var startTime = 0;
var endTime = 0;
var timerInterval = null;

function startGame() {
  document.getElementById("status").style.display = "block";
  document.getElementById("score").innerText = "Score: " + score;
  gameArea = document.getElementById("game-area");

  // Reset the game
  orbs = [];
  score = 0;

  // Generate initial orbs
  generateOrbs(10);

  // Start the timer
  startTime = performance.now();
  startTimer();

  // Start the game loop
  gameLoop();
}

function quitGame() {
  // Clear the game area
  gameArea.innerHTML = "";

  // Hide the game status
  document.getElementById("status").style.display = "none";

  // Stop the timer
  clearInterval(timerInterval);
}

function generateOrbs(numOrbs) {
  for (let i = 0; i < numOrbs; i++) {
    createOrb();
  }
}

function createOrb() {
  const orb = document.createElement("div");
  orb.className = "orb";
  orb.style.left = Math.floor(Math.random() * 380) + "px";
  orb.style.top = Math.floor(Math.random() * 180) + "px";
  gameArea.appendChild(orb);
  orbs.push(orb);

  // Add click event listener to each orb
  orb.addEventListener("click", function () {
    orb.style.display = "none";
    score++;
    document.getElementById("score").innerText = "Score: " + score;

    // Remove the orb from the array
    orbs.splice(orbs.indexOf(orb), 1);

    // Check if all orbs have been clicked
    if (orbs.length === 0) {
      endTime = performance.now();
      var totalTime = ((endTime - startTime) / 1000).toFixed(2);
      clearInterval(timerInterval);
      alert("Game Over!\nYour Score: " + score + "\nTotal Time: " + totalTime + "s");
      quitGame();
    }
  });
}

function startTimer() {
  // Remove existing timer element
  var timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.parentNode.removeChild(timerElement);
  }

  // Create new timer element
  timerElement = document.createElement("p");
  timerElement.id = "timer";
  timerElement.innerText = "Time: 0s";
  document.getElementById("status").appendChild(timerElement);

  var seconds = 0;

  timerInterval = setInterval(function () {
    seconds++;
    timerElement.innerText = "Time: " + seconds + "s";
  }, 1000);
}

function gameLoop() {
  // Repeat the game loop
  requestAnimationFrame(gameLoop);
}
