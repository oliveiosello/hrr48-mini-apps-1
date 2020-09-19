// TRACK STATE OF GAME
// need to know:
//   current player
//   current plays on grid
//   current state of game?

// HTML Elements
const result = document.querySelector('.result');

const playerTurnElement = document.querySelector('.player-turn');

const squareElements = document.querySelectorAll('.square');

const resetButtonElement = document.querySelector('.reset');

const winCountsElement = document.querySelector('.win-counts');

// Set up Event Listeners

squareElements.forEach((square) => {
  square.addEventListener('click', () => {
    handleMove(parseInt(square.getAttribute('index')));
  });
});

resetButtonElement.addEventListener('click', () => {
  restartGame();
});

const x = 'x';
const o = 'o';

let currentPlayer = x;
let currentGame = new Array(9).fill(null);
let winner = null;

let winCounts = {
  x: 0,
  o: 0,
};

const switchPlayer = () => {
  if (currentPlayer === x) {
    currentPlayer = o;
  } else {
    currentPlayer = x;
  }
};

const isValidMove = (index) => currentGame[index] === null;

const handleMove = (index) => {
  if (winner) return;
  if (!isValidMove(index)) return;

  currentGame[index] = currentPlayer;
  switchPlayer();

  winner = determineWinner();
  if (winner) {
    winCounts[winner] += 1;
  }

  renderPage();
};

const restartGame = () => {
  currentPlayer = x;
  currentGame = new Array(9).fill(null);
  winner = null;
  renderPage();
};

const renderPage = () => {
  currentGame.forEach((piece, index) => {
    squareElements[index].textContent = piece;
  });

  winCountsElement.textContent = `x ${winCounts.x} | o ${winCounts.o}`;

  if (winner === null) {
    playerTurnElement.textContent = currentTurn();
  } else if (winner === 'tie') {
    playerTurnElement.textContent = tie;
  } else {
    playerTurnElement.textContent = win();
  }
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const determineWinner = () => {
  for (let winCombo of winningCombinations) {
    const pieces = winCombo.map((i) => currentGame[i]);
    if (
      pieces[0] === pieces[1] &&
      pieces[1] === pieces[2] &&
      pieces[1] !== null
    ) {
      return pieces[0];
    }
  }

  if (!currentGame.some((piece) => piece === null)) {
    return 'tie';
  }

  return null;
};

// RENDER ELEMENTS
// messages:
//   current player
//     how to transition from played to current turn
//     need to be mindful of click which wins, need to check before switching
//   winner
//     winner will always be last played
//   tie

const currentTurn = () => `${currentPlayer} make a move!`;

const win = () => `${winner} wins!`;

const tie = 'you both win!';

// when user clicks square
//   determine if occupied
//   update square status

// USER INPUT
// change status of square
// switch players
// restart game
// determine result of game

// considerations:
//   if square is occupied
//   how to calculate winning arrangement
//     ideas:
//       utilize square indecies
//         hard-code winning combos
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [6, 4, 2]

// string of type of even, callback function
