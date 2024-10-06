import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Button, message } from 'antd';
import {
    makeRandomMove,
    makeBlockingMove,
    findBestMove,
    calculateWinner,
    isBoardFull
} from './gameUtils';

const { Option } = Select;


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
            if (isBoardFull(board)) {
                return;
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
  
    const handleStartGame = () => {
        setBoard(initialBoard);
        setIsXNext(true);
        setGameStarted(true);
    };

    const handleResetGame = () => {
        setBoard(initialBoard);
        setIsXNext(true);
        setGameStarted(false);
    };

    const winner = calculateWinner(board);
    const isTie = !winner && isBoardFull(board);
    const canResetGame = !!winner || isTie;

    useEffect(() => {
        if (gameStarted && !isXNext && !winner) {
            if (isBoardFull(board)) return;

            const timer = setTimeout(() => {
                botMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, board, gameStarted, winner]);

    return (
        <div className="flex items-center w-full justify-center h-full text-gray-10  ">
            <div className="w-full flex flex-col gap-4 h-full justify-center items-center    ">
                <div className="mt-4 text-center">
                    <div className="mb-4 text-center">
                        <label htmlFor="difficulty" className="mr-2">Select Difficulty:</label>
                        <Select
                            id="difficulty"
                            value={difficulty}
                            onChange={(value) => setDifficulty(value)}
                            disabled={gameStarted}
                            style={{ width: 200 }}
                        >
                            <Option value="easy">Easy</Option>
                            <Option value="medium">Normal</Option>
                            <Option value="hard" disabled>Expert</Option>
                        </Select>
                    </div>
                    <Button
                        onClick={handleStartGame}
                        disabled={gameStarted}
                        type="primary"
                    >
                        Start Game
                    </Button>
                    <Button
                        onClick={handleResetGame}
                        disabled={!canResetGame}
                        type="default"
                        className="ml-4"
                    >
                        Reset Game
                    </Button>
                </div>
                <div className=" flex flex-col w-3/4 flex-1 justify-center items-center ">
                    {board.map((row, rowIndex) => (
                        <Row key={rowIndex} gutter={[8, 8]} className='w-full h-full '>
                            {row.map((cell, colIndex) => (
                                <Col key={colIndex} span={8} className=' w-full h-full p-1'>
                                    <Button
                                        className="w-full h-full bg-orange-80 disabled:text-gray-10"
                                        type="dashed"
                                        block
                                        onClick={() => handleClick(rowIndex, colIndex)}
                                        disabled={cell !== null || !!winner || !gameStarted}
                                        style={{
                                            fontSize: '5vw',  // Responsive text size based on viewport width
                                            maxWidth: '100px',  // Ensures buttons don’t grow too large on bigger screens
                                            maxHeight: '100px', // Similar constraint for height
                                            display: 'flex',    // Flexbox ensures proper alignment of text
                                            justifyContent: 'center', // Centers text horizontally
                                            alignItems: 'center',     // Centers text vertically
                                        }}
                                    >
                                        {cell}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
                {winner ? <p>{winner} wins!</p> : isTie ? <p>It's a tie!</p> : <p>{isXNext ? 'Your turn!' : 'Bot\'s turn!'}</p>}
            </div>
        </div>
    );
};

export default TicTacToe;
