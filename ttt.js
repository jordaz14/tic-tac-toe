// NPM INSTALL prompt-sync & figlet
const prompt = require("prompt-sync")({ sigint: true });
var figlet = require("figlet");

// MAIN CODE

// Displays opening welcome message
openingSequence();

setTimeout(() => {
  // Prompts user to begin game
  do {
    var enter = prompt("Press 'Enter' to Begin: ");
  } while (enter != "");

  // Establish turn counter, game status, and game board variables
  var turnCount = 1;
  var endGame = false;
  const gameBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  // Prompts user to select 1-Player or 2-Player mode
  do {
    var playersCount = prompt("1P or 2P? ").toUpperCase();
  } while (playersCount != "1P" && playersCount != "2P");

  // 1-PLAYER MODE
  if (playersCount == "1P") {
    console.log("Welcome to 1-Player Mode \nHere is The Board:");
    // [Enter Code Here]
  }

  // 2-PLAYER MODE
  if (playersCount == "2P") {
    // Displays intitial state of gameBoard
    console.log(`Welcome to 2-Player Mode \nHere is The Board:`);
    displayBoard(gameBoard);

    // Determines which players are 'X' and 'O', evaluates to array of [X, O] or [O, X]
    symbolResult = selectSymbol("Player 2");

    // Do-while loop: Plays game until winner is determined or gameBoard is full
    do {
      // Using turn count, determines...
      // If game is over
      if (turnCount == 10) {
        console.log("Game over. No winner declared.");
        break;
      } // If player 1's turn
      else if (turnCount % 2 == 1) {
        var player = symbolResult[0];
      } // If player 2's turn
      else {
        var player = symbolResult[1];
      }

      // Prompts user to select a row and col on gameBoard
      userSelectMove(gameBoard, turnCount, player);

      // Displays current state of gameBoard
      console.log(`Board after Turn ${turnCount}`);
      displayBoard(gameBoard);

      // Checks for winner, and if so, subsequently ends game by evaluating endGame to True
      endGame = checkWinner(gameBoard, player);

      //Increments turnCount to move to next turn
      turnCount++;
    } while (endGame == false);
  }
}, 4000);

//SUPPORTING CODE

// Opening sequence to welcome user and display 'Tic-Tac-Toe' in ASCII word art
function openingSequence() {
  console.log("WELCOME TO...");

  setTimeout(() => {
    console.log(
      figlet.textSync("TIC", {
        font: "Blocks",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );
  }, 1000);

  setTimeout(() => {
    console.log(
      figlet.textSync("TAC", {
        font: "Blocks",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );
  }, 2000);

  setTimeout(() => {
    console.log(
      figlet.textSync("TOE", {
        font: "Blocks",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );
  }, 3000);
}

// Displays gameBoard to user using ACII block characters
function displayBoard(gameBoard) {
  for (var rowI = 0; rowI < 3; rowI++) {
    console.log(
      figlet.textSync(
        gameBoard[rowI][0] + gameBoard[rowI][1] + gameBoard[rowI][2],
        {
          font: "Blocks",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        }
      )
    );
  }
}

// Prompts Player 1 to select X or O symbol
function selectSymbol(player2Name) {
  do {
    var symbol1 = prompt(`Player 1, are you X's or O's? `).toUpperCase();
  } while (symbol1 != "X" && symbol1 != "O");

  // If Player 1 selects 'X', Player 2 is 'O'; vice versa
  if (symbol1 == "X") {
    var symbol2 = "O";
    console.log(`Player 1 has selected 'X'; ${player2Name} is 'O'.`);
  } else {
    var symbol2 = "X";
    console.log(`Player 1 has selected 'O'; ${player2Name} is 'X'.`);
  }
  return [symbol1, symbol2];
}

function userSelectMove(gameBoard, turnCount, player) {
  var regEx = /^\d+$/;
  // Do-while loop: asks for row & col input until user inputs a valid space that is not yet claimed
  do {
    //Do-while loop: validates that users selects a row # between 1-3
    do {
      var row = prompt(
        `Turn ${turnCount}. ${player}'s, select your row number: `
      );
    } while (
      parseInt(row) < 1 ||
      parseInt(row) > 3 ||
      regEx.test(row) == false
    );
    //Do-while loop: validates that users selects a col # between 1-3
    do {
      var col = prompt(
        `Turn ${turnCount}. ${player}'s, select your col number: `
      );
    } while (
      parseInt(col) < 1 ||
      parseInt(col) > 3 ||
      regEx.test(col) == false
    );
  } while (
    // Checks that user's choice is not yet claimed
    gameBoard[row - 1][col - 1] == "X" ||
    gameBoard[row - 1][col - 1] == "O"
  );

  // Adds user's symbol (i.e. 'X' or 'O') to their selected space
  gameBoard[row - 1][col - 1] = player;
}

function checkWinner(gameBoard, player) {
  // Check each row in gameBoard for winning sequence
  for (var rowI = 0; rowI < 3; rowI++) {
    // Reports winner if all entries in a row match the user's symbol
    if (
      gameBoard[rowI][0] == player &&
      gameBoard[rowI][1] == player &&
      gameBoard[rowI][2] == player
    ) {
      console.log(`${player}'s won via a row match!`);
      return true;
    }
  }

  // Check each col in gameBoard for winning sequence
  for (var colI = 0; colI < 3; colI++) {
    // Reports winner if all entries in a col match the user's symbol
    if (
      gameBoard[0][colI] == player &&
      gameBoard[1][colI] == player &&
      gameBoard[2][colI] == player
    ) {
      console.log(`${player}'s won via a column match!`);
      return true;
    }
  }

  // Check diagonals in gameBoard for winning sequence
  if (
    // Upper-left, lower-right diagonal match
    (gameBoard[0][0] == player &&
      gameBoard[1][1] == player &&
      gameBoard[2][2] == player) ||
    // Upper-right, lower-left diagonal match
    (gameBoard[2][0] == player &&
      gameBoard[1][1] == player &&
      gameBoard[0][2] == player)
  ) {
    console.log(`${player}'s won via a diagonal match!`);
    return true;
  }

  // If no winning sequence, return false
  return false;
}
