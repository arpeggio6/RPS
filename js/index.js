"use strict";

var targetScoreOutput = document.getElementById("target-score");
targetScoreOutput.innerHTML = "Press start button!!";
var output = document.getElementById("output");
output.innerHTML = "Make your move!" + "<br><br>" + output.innerHTML;
var modalHeader = document.getElementsByTagName("header")[0];
var modalContent = document.getElementsByClassName("content")[0];

var paperButton = document.getElementById("paper-button");
var rockButton = document.getElementById("rock-button");
var scissorsButton = document.getElementById("scissors-button");
var startButton = document.getElementById("start-button");
var playerMoveButtons = document.getElementsByClassName("player-move");

var modalLinks = document.querySelectorAll('.show-modal');
var modals = document.querySelectorAll('.modal');
var closeButtons = document.querySelectorAll('.modal .close');

var userScoreBoard = document.getElementById("user-result");
var compScoreBoard = document.getElementById("comp-result");
var winner = '';

var params = {
  targetScore: 0,
  userScore: 0,
  compScore: 0, 
  roundsPlayed: 0,
  progress: [],
}

var choice = {
  paper: 'paper',
  rock: 'rock',
  scissors: 'scissors',
}

startButton.addEventListener("click", function() {
  targetScoreOutput.innerHTML = "Press start button!!";
  params.targetScore = parseInt(window.prompt("Enter target score:"));
  params.userScore = 0;
  params.compScore = 0;
  params.roundsPlayed = 0;
  params.progress = [];
  userScoreBoard.innerHTML = 0;
  compScoreBoard.innerHTML = 0;
  if (params.targetScore > 0) {
    targetScoreOutput.innerHTML = "First to reach " + params.targetScore + " wins.";
  }
  else {
    window.alert("You must enter a positive number before you start playing!");
  }
});

for (var i = 0; i < playerMoveButtons.length; i++) {
  playerMoveButtons[i].addEventListener("click", function(){
      var userChoice = this.getAttribute('data-move');
      playerMove(userChoice);
      if (!params.targetScore || params.targetScore <= 0){
        window.alert("Press start button first, please!");
      }
  })
}

function getComputerChoice() {
  var Moves = ["paper", "rock", "scissors"];
  var randomNumber = Math.floor(Math.random() * 3);
  return Moves[randomNumber];
}

function win(userChoice, computerChoice) {
  output.innerHTML = "You win! " + userChoice + " beats " + computerChoice;
  params.userScore++;
  params.roundsPlayed++;
  userScoreBoard.innerHTML = params.userScore;
  winner = 'Player';
}

function draw(userChoice, computerChoice) {
  output.innerHTML = "Draw! You both played " + userChoice;
  params.roundsPlayed++;
  winner = 'Draw';
}

function lose(userChoice, computerChoice) {
  output.innerHTML = "You lose! " + userChoice + " is beated by " + computerChoice;
  params.compScore++;
  params.roundsPlayed++;
  compScoreBoard.innerHTML = params.compScore;
  winner = 'Computer';
}


function playerMove(userChoice, computerChoice) {
  if (params.targetScore > 0) {
    if (params.userScore < params.targetScore && params.compScore < params.targetScore) {
      var computerChoice = getComputerChoice();
        if (userChoice === choice.paper && computerChoice === choice.rock ||
            userChoice === choice.rock && computerChoice === choice.scissors ||
            userChoice === choice.scissors && computerChoice === choice.paper) {
              win(userChoice, computerChoice);
        }
        else if (userChoice === computerChoice) {
              draw(userChoice, computerChoice);
        }
        else {
              lose(userChoice, computerChoice);
        }
        if (params.userScore === params.targetScore) {
              output.innerHTML = 'Game ended! You won!';
              targetScoreOutput.innerHTML = "Press start button!!"; 
              modalHeader.innerHTML = 'Game ended! You won!';
        }
        else if (params.compScore === params.targetScore) {
              output.innerHTML = 'Game ended! You lost!';
              targetScoreOutput.innerHTML = "Press start button!!";
              modalHeader.innerHTML = 'Game ended! You lost!';
        }
    }
  }
  var gameProgress = {
         userChoice: userChoice,
         computerChoice: computerChoice, 
         userScore: params.userScore,
         compScore: params.compScore,
         roundsPlayed: params.roundsPlayed,
         winner: winner,
        }
    params.progress.push(gameProgress);

    if (params.userScore === params.targetScore ||
       params.compScore === params.targetScore) {
        createTable()      
        showModal();
    }
}
function createTable() {
  var modalContent = document.getElementsByClassName('content')[0];
  var table = document.createElement('table');

  modalContent.appendChild(table);

  var tableContent = '<table><thead><tr><th>Rounds</th><th>Your Move</th><th>Computer Move</th><th>Round Result</th><th>Winner</th></tr></thead><tbody>';

  for (i = 0; i < params.progress.length; i++) {
    tableContent += '<tr><td>' +
      params.progress[i].roundsPlayed + '</td><td>' +
      params.progress[i].userChoice + '</td><td>' +
      params.progress[i].computerChoice + '</td><td>' +
      params.progress[i].userScore + ' : ' + params.progress[i].compScore + '</td><td>' +
      params.progress[i].winner  + '</td></tr>'
  }
  tableContent += '</tbody></table>';
    
  modalContent.innerHTML = tableContent;
}

var showModal = function(){
    
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.add('show');
  modals[0].classList.add('show');
};
	
for(var i = 0; i < modalLinks.length; i++){
	modalLinks[i].addEventListener('click', showModal);
}

var hideModal = function(event){
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
};
	
for(var i = 0; i < closeButtons.length; i++){
	closeButtons[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for(var i = 0; i < modals.length; i++){
	modals[i].addEventListener('click', function(event){
		event.stopPropagation();
	});
}