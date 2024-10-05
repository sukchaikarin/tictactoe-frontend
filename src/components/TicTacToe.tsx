import React, { useState, useEffect } from 'react';

const TicTacToe: React.FC = () => {
  const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (!gameStarted || board[rowIndex][colIndex] || calculateWinner(board) || !isXNext) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? 'X' : cell
      )
    );

    setBoard(newBoard);
    setIsXNext(false); // Switch to bot's turn
  };

  const botMove = () => {
    if (!isXNext) {
      const availableMoves = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) availableMoves.push({ i, j });
        }
      }

      if (availableMoves.length > 0) {
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const newBoard = board.map((row, rIdx) =>
          row.map((cell, cIdx) =>
            rIdx === randomMove.i && cIdx === randomMove.j ? 'O' : cell // Assuming bot plays 'O'
          )
        );

        setBoard(newBoard);
        setIsXNext(true); // Switch back to player's turn after bot's move
      }
    }
  };

  const calculateWinner = (squares: string[][]): string | null => {
    const lines = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[Math.floor(a / 3)][a % 3] &&
        squares[Math.floor(a / 3)][a % 3] === squares[Math.floor(b / 3)][b % 3] &&
        squares[Math.floor(a / 3)][a % 3] === squares[Math.floor(c / 3)][c % 3]
      ) {
        return squares[Math.floor(a / 3)][a % 3];
      }
    }
    return null;
  };

  const isBoardFull = (squares: string[][]): boolean => {
    return squares.every(row => row.every(cell => cell !== null));
  };

  const handleStartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setGameStarted(true);
  };

  const winner = calculateWinner(board);
  const isTie = !winner && isBoardFull(board);
  const canResetGame = !!winner || isTie; // Game can reset if there's a winner or a tie

  useEffect(() => {
    if (gameStarted && !isXNext && !winner) {
      const timer = setTimeout(() => {
        botMove();
      }, 500); // 500ms delay for the bot's move
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameStarted, winner]);

  return (
    <div className="flex-grow p-4 bg-green-50 m-2 rounded-lg shadow-md">
      <h2 className="text-center text-2xl mb-4">
        {winner ? `Winner: ${winner}` : isTie ? 'Tie' : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`h-24 w-24 flex items-center justify-center text-6xl font-bold 
                          ${cell ? 'text-gray-500 bg-gray-200' : 'text-blue-600 bg-white'} 
                          border-2 border-gray-400 rounded-lg transition duration-200 transform hover:scale-105`}
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={!gameStarted || !!cell || !!winner} // Disable if game hasn't started or cell is occupied or there's a winner
              style={{ cursor: !isXNext ? 'not-allowed' : 'pointer' }} // Set cursor based on turn
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {!gameStarted ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => {
              setBoard(initialBoard);
              setGameStarted(false); // Reset the game state to false
            }}
            disabled={!canResetGame} // Disable if there's no winner or tie
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
