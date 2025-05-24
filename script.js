const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const resetButton = document.getElementById('resetButton'); // ← nowy przycisk

let isXTurn = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
  cell.removeEventListener('click', handleClick);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw) {
  if (draw) {
    message.textContent = 'Remis!';
  } else {
    message.textContent = `${isXTurn ? 'X' : 'O'} wygrywa!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('X') || cell.classList.contains('O')
  );
}

function checkWin(currentClass) {
  return winningCombinations.some(combination =>
    combination.every(index =>
      cells[index].classList.contains(currentClass)
    )
  );
}

function startGame() {
  isXTurn = true;
  message.textContent = '';
  cells.forEach(cell => {
    cell.className = 'cell';
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

restartButton.addEventListener('click', startGame);
resetButton.addEventListener('click', startGame); // ← Reset robi to samo

startGame();
