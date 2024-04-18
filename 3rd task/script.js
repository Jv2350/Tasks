const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(cell) {
  const clickedCellIndex = cell.getAttribute('data-index');

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  checkWin();
  checkDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      highlightWinningCells(condition);
      status.textContent = `${gameState[a]} wins!`;
    }
  }
}

function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  status.textContent = "Let's play!";
}

function updateStatus() {
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(cells) {
  cells.forEach(index => {
    document.querySelector(`.cell[data-index="${index}"]`).classList.add('win');
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

restartButton.addEventListener('click', restartGame);

updateStatus();
