// const board=Array.from({length:9},()=>"")

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;
let board = Array(9).fill("").map(()=>"")
const reset = document.querySelector("#resetButton")

function playerTurn(index) {
  if (!gameActive || board[index] !== "") {
    return;
  }
  board[index] = currentPlayer;
  checkWinOrDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function cellClicked(e) {
  let cell = e.target;
  let index = parseInt(cell.id.replace("cell-", "")) - 1;
  if (board[index] !== "" || !gameActive) {
    return;
  }
  playerTurn(index);
  updateCell();
}

cells.forEach((cell) => cell.addEventListener("click", cellClicked,false));

function updateCell() {
  for (i = 0; i < cells.length; i++) {
    cells[i].innerText = board[i];
  }
}

function checkWinOrDraw() {
  let roundWon = false;
  for (i = 0; i < winCondition.length; i++) {
    const [a, b, c] = winCondition[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    announceWinning(currentPlayer);
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    gameActive = false;
    announceDraw();
    return;
  }
}
    let message = document.getElementById("gameMessage");

function announceWinning(currentPlayer){
    message.textContent = `${currentPlayer} won`
}
function announceDraw(){
    message.textContent = "Its Draw"
}

function resetGame(){
    gameActive = true;
    currentPlayer = "X";
    board = Array.from({length:9},()=>"");
    cells.forEach((cell)=>cell.textContent="");
    message.textContent = "";
    
}
reset.addEventListener('click',function(){
    resetGame(currentPlayer)})
