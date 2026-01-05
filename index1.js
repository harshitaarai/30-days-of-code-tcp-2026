const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

function handleClick() {
    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
    let roundWon = false;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWin(pattern);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        cells.forEach(cell => cell.classList.add("draw"));
        gameActive = false;
    }
}

function highlightWin(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add("win");
    });
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win", "draw");
    });
}
