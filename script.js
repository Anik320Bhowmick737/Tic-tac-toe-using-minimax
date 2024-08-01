let boards = document.querySelectorAll(".board");
let btnX = document.querySelector(".X");
let btnO = document.querySelector(".O");
let userChoice = document.querySelector(".userChoice");
let playfirstY = document.querySelector(".Yes");
let playfirstN = document.querySelector(".No");
let play = document.querySelector(".play");
let mainSec = document.querySelector(".mainSection");
let verdict = document.querySelector(".Verdict");
let playerH;
let playerA;
let board;

btnX.addEventListener("click", () => {
  btnO.classList.contains("active") ? btnO.classList.remove("active") : 0;
  btnX.classList.add("active");
});

btnO.addEventListener("click", () => {
  btnX.classList.contains("active") ? btnX.classList.remove("active") : 0;
  btnO.classList.add("active");
});

playfirstY.addEventListener("click", () => {
  playfirstN.classList.contains("active")
    ? playfirstN.classList.remove("active")
    : 0;
  playfirstY.classList.add("active");
});

playfirstN.addEventListener("click", () => {
  playfirstY.classList.contains("active")
    ? playfirstY.classList.remove("active")
    : 0;
  playfirstN.classList.add("active");
});

play.addEventListener("click", () => {
  if (btnX.classList.contains("active")) {
    playerH = "X";
    playerA = "O";
  } else {
    playerH = "O";
    playerA = "X";
  }
  if (
    (playfirstY.classList.contains("active") ||
      playfirstN.classList.contains("active")) &&
    (btnX.classList.contains("active") || btnO.classList.contains("active"))
  ) {
    startBoard();
    if (playfirstY.classList.contains("active")) {
      verdict.textContent = "Your Turn";
      HumanMove();
    } else {
      verdict.textContent = "Computer's Turn";
      disableBoard();
      AiMove();
    }
  } else {
    alert("Select input first");
  }
});

const startBoard = () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  //clear the board
  for (let i = 0; i < boards.length; i++) {
    let div = boards[i];
    div.textContent = "";
    div.classList.contains("winnerStyle")
      ? div.classList.remove("winnerStyle")
      : 0;
  }
  userChoice.classList.add("hide");
  mainSec.classList.add("show");
};

const HandleWin = (index) => {
  for (let i = 0; i < index.length; i++) {
    boards[Math.floor(3 * index[i][0] + index[i][1])].classList.add(
      "winnerStyle"
    );
  }
  disableBoard();
};

const checkWin = () => {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return {
        matched: true,
        indices: [
          [i, 0],
          [i, 1],
          [i, 2],
        ],
      };
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ""
    ) {
      return {
        matched: true,
        indices: [
          [0, i],
          [1, i],
          [2, i],
        ],
      };
    }
  }
  // check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    return {
      matched: true,
      indices: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    };
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    return {
      matched: true,
      indices: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    };
  }
  return { matched: false, indices: [] };
};

const updateBoard = (i, j, player) => {
  board[i][j] = player;
  boards[Math.floor(3 * i + j)].textContent = player;
  return checkWin();
};

const ResetGame = () => {
  mainSec.classList.remove("show");
  btnO.classList.contains("active") ? btnO.classList.remove("active") : 0;
  btnX.classList.contains("active") ? btnX.classList.remove("active") : 0;
  playfirstN.classList.contains("active")
    ? playfirstN.classList.remove("active")
    : 0;
  playfirstY.classList.contains("active")
    ? playfirstY.classList.remove("active")
    : 0;
  setTimeout(() => {
    userChoice.classList.remove("hide");
  }, 250);
};

const checkMove = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") return true;
    }
  }
  return false;
};

const disableBoard = () => {
  boards.forEach((b) => {
    b.removeEventListener("click", handleClick);
  });
};

const enableBoard = () => {
  boards.forEach((b) => {
    b.addEventListener("click", handleClick);
  });
};

const handleClick = (event) => {
  let b = event.target;
  if (b.textContent === "") {
    let i = parseInt(b.id[0], 10);
    let j = parseInt(b.id[1], 10);
    let result = updateBoard(i, j, playerH);
    if (result.matched == false) {
      disableBoard();
      if (checkMove() === false) {
        verdict.textContent = "Game tied !!!!";
      } else {
        AiMove();
      }
    } else {
      HandleWin(result.indices);
      verdict.textContent = "You won !!!!";
    }
  }
};

const HumanMove = () => {
  verdict.textContent = "Your Turn";
  boards.forEach((b) => {
    b.addEventListener("click", handleClick);
  });
};
const AiMove = () => {
  console.log("Ai move");
  verdict.textContent = "Computer's Turn";

  const isMoveLeft = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") return true;
      }
    }
    return false;
  };

  const eval = () => {
    //check row condition
    for (let i = 0; i < 3; i++) {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        if (board[i][0] == playerA) return 1;
        else if (board[i][0] == playerH) return -1;
      }
    }
    //check column condition
    for (let i = 0; i < 3; i++) {
      if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
        if (board[0][i] == playerA) return 1;
        else if (board[0][i] == playerH) return -1;
      }
    }
    //check diagonal
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      if (board[0][0] == playerA) return 1;
      else if (board[0][0] == playerH) return -1;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
      if (board[0][2] == playerA) return 1;
      else if (board[0][2] == playerH) return -1;
    }
    return 0;
  };

  const minimax = (isMax) => {
    let score = eval();
    if (score == 1) return 1;
    if (score == -1) return -1;
    if (isMoveLeft() == false) return 0;

    if (isMax) {
      let best = -1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] == "") {
            // Make the move
            board[i][j] = playerA;

            // Call minimax recursively and choose
            // the maximum value
            best = Math.max(best, minimax(false));

            // Undo the move
            board[i][j] = "";
          }
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] == "") {
            // Make the move
            board[i][j] = playerH;

            // Call minimax recursively and choose
            // the maximum value
            best = Math.min(best, minimax(true));

            // Undo the move
            board[i][j] = "";
          }
        }
      }
      return best;
    }
  };

  const findBestMove = () => {
    let best = -1000;
    let best_i;
    let best_j;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = playerA;
          let Currbest = minimax(false);
          board[i][j] = "";

          if (Currbest > best) {
            best_i = i;
            best_j = j;
            best = Currbest;
          }
        }
      }
    }
    return { indices: [best_i, best_j] };
  };
  setTimeout(() => {
    let indices = findBestMove().indices;
    let i = indices[0];
    let j = indices[1];
    let result = updateBoard(i, j, playerA);
    if (result.matched == false) {
      if (checkMove() === false) {
        verdict.textContent = "Game tied !!!!";
      } else {
        HumanMove();
      }
    } else {
      HandleWin(result.indices);
      verdict.textContent = "Computer won !!!";
    }
  }, 1000);
};
let ResetBtn = document.querySelector(".ResetBtn");
ResetBtn.addEventListener("click", ResetGame);
