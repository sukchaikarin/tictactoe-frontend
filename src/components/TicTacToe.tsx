import React, { useState, useEffect } from 'react';

const TicTacToe: React.FC = () => {
  const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  const [board, setBoard] = useState<(string | null)[][]>(initialBoard);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>('easy');

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (!gameStarted || board[rowIndex][colIndex] || calculateWinner(board) || !isXNext) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? 'X' : cell
      )
    );

    setBoard(newBoard);
    setIsXNext(false); 
  };

  const botMove = () => {
    if (!isXNext) {
      // Check if the board is full before making a move
      if (isBoardFull(board)) {
        return; // Do nothing if the board is full
      }
      
      let newBoard;
      if (difficulty === 'easy') {
        newBoard = makeRandomMove(board);
      } else if (difficulty === 'medium') {
        newBoard = makeBlockingMove(board) || makeRandomMove(board);
      } else {
        const bestMove = findBestMove(board);
        newBoard = board.map((row, rIdx) =>
          row.map((cell, cIdx) =>
            rIdx === bestMove.i && cIdx === bestMove.j ? 'O' : cell
          )
        );
      }
      setBoard(newBoard);
      setIsXNext(true); 
    }
  };

  const makeRandomMove = (newBoard: (string | null)[][]) => {
    const availableMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!newBoard[i][j]) availableMoves.push({ i, j });
      }
    }
  
    if (availableMoves.length === 0) {
      return newBoard; // ถ้าไม่มีการเคลื่อนไหวที่เหลือ ให้คืนค่าเดิมของบอร์ดโดยไม่เปลี่ยนแปลง
    }
  
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return newBoard.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === randomMove.i && cIdx === randomMove.j ? 'O' : cell
      )
    );
  };

  const makeBlockingMove = (newBoard: (string | null)[][]) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!newBoard[i][j]) {
          newBoard[i][j] = 'X';
          if (calculateWinner(newBoard) === 'X') {
            newBoard[i][j] = 'O'; 
            return newBoard;
          }
          newBoard[i][j] = null; 
        }
      }
    }
    return null;
  };

  const findBestMove = (newBoard: (string | null)[][]) => {
    let bestScore = -Infinity;
    let move = { i: 0, j: 0 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!newBoard[i][j]) {
          newBoard[i][j] = 'O';
          const score = minimax(newBoard, 0, false);
          newBoard[i][j] = null;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    return move;
  };

  const minimax = (newBoard: (string | null)[][], depth: number, isMaximizing: boolean) => {
    const winner = calculateWinner(newBoard);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (isBoardFull(newBoard)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!newBoard[i][j]) {
            newBoard[i][j] = 'O';
            const score = minimax(newBoard, depth + 1, false);
            newBoard[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!newBoard[i][j]) {
            newBoard[i][j] = 'X';
            const score = minimax(newBoard, depth + 1, true);
            newBoard[i][j] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const calculateWinner = (squares: (string | null)[][]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
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

  const isBoardFull = (squares: (string | null)[][]): boolean => {
    return squares.every(row => row.every(cell => cell !== null));
  };

  const handleStartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setGameStarted(false); // Stop the current game
  };

  const winner = calculateWinner(board);
  const isTie = !winner && isBoardFull(board);
  const canResetGame = !!winner || isTie;

  useEffect(() => {
    if (gameStarted && !isXNext && !winner) {
      // Check if the board is full before making a move
      if (isBoardFull(board)) {
        return; // Do nothing if the board is full
      } 
      const timer = setTimeout(() => {
        botMove();
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameStarted, winner]);

  return (
    <div className="flex items-center justify-center h-2/3 bg-yellow-20">
      <div className="flex-grow p-4 bg-white m-2 rounded-lg shadow-md max-w-md">
        <h2 className="text-center text-2xl mb-4">
          {winner ? `Winner: ${winner}` : isTie ? 'Tie' : `Next Player: ${isXNext ? 'X' : 'O'}`}
        </h2>

        <div className="mb-4 text-center">
          <label htmlFor="difficulty" className="mr-2">Select Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
            disabled={gameStarted} // Disable during the game
          >
            <option value="easy">Easy</option>
            <option value="medium">Normal</option>
            <option value="hard">Expert</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`h-24 w-24 flex items-center justify-center text-4xl font-bold 
                            ${cell ? 'text-gray-500 bg-gray-200' : 'text-blue-600 bg-white'} 
                            border border-gray-300 rounded-lg shadow-md`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </button>
            ))
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleStartGame}
            disabled={gameStarted}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Game
          </button>
          <button
            onClick={handleResetGame}
            disabled={!canResetGame}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
