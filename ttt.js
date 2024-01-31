const prompt = require("prompt-sync")({ sigint: true });
var figlet = require("figlet");

// Opening sequence to welcome user and display 'Tic-Tac-Toe' in ASCII word art
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

setTimeout(() => {
  // Prompts user to begin game
  do {
    var enter = prompt("Press 'Enter' to Begin: ");
  } while (enter != "");

  // Declares or Initiailzies relevant variables for game to utilize
  var turnCount = 1;
  var symbol1, symbol2;
  var endGame = false;
  const gameBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  // Prompts user to select 1-Player or 2-Player mode
  do {
    var players = prompt("1P or 2P? ").toUpperCase();
  } while (players != "1P" && players != "2P");

  // 1-PLAYER MODE
  if (players == "1P") {
    console.log("Welcome to 1-Player Mode");
  }

  // 2-PLAYER MODE
  if (players == "2P") {
    console.log(`Welcome to 2-Player Mode \nHere is The Board:`);

    // Displays intitial state of gameBoard
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

    // Prompts Player 1 to select X or O symbol
    do {
      var symbol1 = prompt(`Player 1, are you X's or O's? `).toUpperCase();
    } while (symbol1 != "X" && symbol1 != "O");

    // If Player 1 selects 'X', Player 2 is 'O'; vice versa
    if (symbol1 == "X") {
      symbol2 = "O";
      console.log("Player 1 has selected 'X'; Player 2, you are 'O'.");
    } else {
      symbol2 = "X";
      console.log("Player 1 has selected 'O'; Player 2, you are 'X'.");
    }

    // Do-while loop: plays game until winner is determined
    do {
      // Using turn count, determines whether it's X's or O's turn, or if the game is over
      if (turnCount == 10) {
        console.log("Game over. No winner declared.");
        break;
      } else if (turnCount % 2 == 1) {
        var player = symbol1;
      } else {
        var player = symbol2;
      }

      // Do-while loop: asks for row & col input until user inputs a valid space that is not yet claimed
      do {
        //Do-while loop: validates that users selects a row # between 1-3
        do {
          var row = prompt(
            `Turn ${turnCount}. ${player}'s, select your row number: `
          );
        } while (parseInt(row) < 1 || parseInt(row) > 3 || row == "");
        //Do-while loop: validates that users selects a col # between 1-3
        do {
          var col = prompt(
            `Turn ${turnCount}. ${player}'s, select your col number: `
          );
        } while (parseInt(col) < 1 || parseInt(col) > 3 || col == "");
      } while (
        gameBoard[row - 1][col - 1] == "X" ||
        gameBoard[row - 1][col - 1] == "O"
      );

      // Adds user's symbol (i.e. 'X' or 'O') to their selected space
      gameBoard[row - 1][col - 1] = player;

      // Displays current state of gameBoard
      console.log(`Board after Turn ${turnCount}`);
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

      // Check rows in gameBoard for winning sequence
      for (var rowI = 0; rowI < 3; rowI++) {
        // Reports winner if all entries in a row match the user's symbol
        if (
          gameBoard[rowI][0] == player &&
          gameBoard[rowI][1] == player &&
          gameBoard[rowI][2] == player
        ) {
          console.log(`${player}'s won via a row match!`);
          endGame = true;
        }
      }

      // Check cols in gameBoard for winning sequence
      for (var colI = 0; colI < 3; colI++) {
        // Reports winner if all entries in a col match the user's symbol
        if (
          gameBoard[0][colI] == player &&
          gameBoard[1][colI] == player &&
          gameBoard[2][colI] == player
        ) {
          console.log(`${player}'s won via a column match!`);
          endGame = true;
        }
      }

      // Check diagonals in gameBoard for winning sequence
      if (
        // Upper-left, lower-right diagonal
        (gameBoard[0][0] == player &&
          gameBoard[1][1] == player &&
          gameBoard[2][2] == player) ||
        // Upper-right, lower-left diagonal
        (gameBoard[2][0] == player &&
          gameBoard[1][1] == player &&
          gameBoard[0][2] == player)
      ) {
        console.log(`${player}'s won via a diagonal match!`);
        endGame = true;
      }

      //Increments turnCount to move to next turn
      turnCount++;
    } while (endGame == false);
  }
}, 4000);
