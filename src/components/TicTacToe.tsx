import React, { useState } from 'react';

const TicTacToe: React.FC = () => {
  const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] || calculateWinner(board)) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? (isXNext ? 'X' : 'O') : cell
      )
    );

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: string[][]): string | null => {
    const lines = [
      // แนวนอน
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // แนวตั้ง
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // แนวเฉียง
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

  return (
    <div className="flex-grow p-4 bg-green-50 m-2 rounded-lg shadow-md">
      <h2 className="text-center text-2xl mb-4">
        {calculateWinner(board) ? `Winner: ${calculateWinner(board)}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`h-24 w-24 flex items-center justify-center text-4xl font-bold 
                          ${cell ? 'text-gray-500 bg-gray-200' : 'text-blue-600 bg-white'} 
                          border-2 border-gray-400 rounded-lg transition duration-200 transform hover:scale-105`}
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={!!cell}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => setBoard(initialBoard)}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
