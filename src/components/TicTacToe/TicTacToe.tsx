import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Button } from 'antd';
import {
    makeRandomMove,
    makeBlockingMove,
    findBestMove,
    calculateWinner,
    isBoardFull
} from './gameUtils';
import { TicTacToeLabels } from '../../constants/constants'; // นำเข้าคอนสแตนต์

const { Option } = Select;

const TicTacToe: React.FC<{ language: 'en' | 'th' }> = ({ language }) => {
    const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));
    const [board, setBoard] = useState<(string | null)[][]>(initialBoard);
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string>('easy');

    const winner = calculateWinner(board);
    const isTie = !winner && isBoardFull(board);
    const canResetGame = !!winner || isTie;

    const handleClick = (rowIndex: number, colIndex: number) => {
        if (!gameStarted || board[rowIndex][colIndex] || winner || !isXNext) return;

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

    useEffect(() => {
        if (gameStarted && !isXNext && !winner) {
            const timer = setTimeout(() => {
                botMove();
            }, 500);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, [isXNext, board, gameStarted, winner]);

    return (
        <div className="flex items-center w-full justify-center h-full text-gray-10">
            <div className="w-full flex flex-col gap-4 h-full justify-center items-center">
                <div id="turnPlay" className="flex justify-center items-center mt-2 p-6 text-2xl h-8 w-full text-center">
                    {gameStarted && (
                        winner ? (
                            <p>{TicTacToeLabels[language].winner(winner)}</p>
                        ) : isTie ? (
                            <p>{TicTacToeLabels[language].tie}</p>
                        ) : (
                            <p>{TicTacToeLabels[language].playerTurn(isXNext)}</p>
                        )
                    )}
                </div>

                <div className="ml-4 flex flex-col w-3/4 flex-1 justify-center items-center ">
                    {board.map((row, rowIndex) => (
                        <Row key={rowIndex} gutter={[16, 16]} className='w-full min-h-24 h-full'>
                            {row.map((cell, colIndex) => (
                                <Col key={colIndex} span={8} className='w-full min-h-24 h-full p-1'>
                                    <Button
                                        className="w-full min-h-24 h-full bg-orange-80 disabled:text-gray-10"
                                        type="dashed"
                                        block
                                        onClick={() => handleClick(rowIndex, colIndex)}
                                        disabled={cell !== null || !!winner || !gameStarted}
                                        style={{
                                            fontSize: '4vw',
                                            minWidth:'50px',
                                            minHeight:'50px',
                                            maxWidth: '96px',
                                            maxHeight: '96px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {cell}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
                <div className="flex flex-col mt-4 text-center">
                    <div className="mb-4 text-center">
                        <label htmlFor="difficulty" className="mr-2">{TicTacToeLabels[language].selectDifficulty}</label>
                        <Select
                            id="difficulty"
                            value={difficulty}
                            onChange={(value) => setDifficulty(value)}
                            disabled={gameStarted}
                            style={{ width: 200 }}
                        >
                            <Option value="easy">{TicTacToeLabels[language].difficultyOptions.easy}</Option>
                            <Option value="medium">{TicTacToeLabels[language].difficultyOptions.medium}</Option>
                            <Option value="hard" disabled>{TicTacToeLabels[language].difficultyOptions.hard}</Option>
                        </Select>
                    </div>
                    <div className='flex items-center justify-center gap-2 '>
                    <Button
                        onClick={handleStartGame}
                        disabled={gameStarted}
                        type="primary"
                    >
                        {TicTacToeLabels[language].startGame}
                    </Button>
                    <Button
                        onClick={handleResetGame}
                        disabled={!canResetGame}
                        type="default"
                        className="ml-4"
                    >
                        {TicTacToeLabels[language].resetGame}
                    </Button>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
