import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver";


const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivePlayer(gameTurns) {
  let currentTurn = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentTurn = "O";
  }

  return currentTurn;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const [square1, square2, square3] = combination;
    const value1 = gameBoard[square1.row][square1.column];
    const value2 = gameBoard[square2.row][square2.column];
    const value3 = gameBoard[square3.row][square3.column];

    if (value1 && value1 === value2 && value2 === value3) {
      winner = players[value1];
      break;
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = derivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns(prevTurns => {
      let currentTurn = derivePlayer(prevTurns);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentTurn },
        ...prevTurns,

      ];

      return updatedTurn;
    });
  }

  function rematch() {
    setGameTurns([]);
  }

  function handelPlayerName(symbol, playerName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: playerName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} changeName={handelPlayerName} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} changeName={handelPlayerName} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} rematch={rematch} />}

        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
