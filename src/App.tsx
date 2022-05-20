import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './Components/BoardComponent';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import LostFigures from './Components/LostFigures';
import Timer from './Components/Timer';
function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <div className="app">
      <Timer restart={restart} currentPlayer={currentPlayer} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Черные" figures={board.lostBlackFigures} />
        <LostFigures title="Белые" figures={board.lostWhiteFigures} />
      </div>
      <p style={{ position: 'absolute', bottom: 0, right: '12px' }}>v1.0</p>
    </div>
  );
}

export default App;
