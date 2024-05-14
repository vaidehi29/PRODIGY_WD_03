const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let current = "X";
let currentState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => ` ${current} has won!`;
const drawMessage = () => `It is a tie!`;
const currentTurn = () => ` ${current}'s turn`;

statusDisplay.innerHTML = currentTurn();

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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    currentState[clickedCellIndex] = current;
    clickedCell.innerHTML = current;
}

function handlePlayerChange() {
    current = current === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = currentState[winCondition[0]];
        const b = currentState[winCondition[1]];
        const c = currentState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !currentState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(currentState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    current = "X";
    currentState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
