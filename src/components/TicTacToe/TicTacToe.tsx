"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Select, Button } from 'antd';
import {
    makeRandomMove,
    makeBlockingMove,
    findBestMove,
    calculateWinner,
    isBoardFull
} from './gameUtils';
import { TicTacToeLabels } from '../../constants/constants';
import { useUser } from '@/context/UserContext'; // Import the UserContext
import { notification} from "antd"; 
const { Option } = Select;

const TicTacToe: React.FC<{ language: 'en' | 'th' }> = ({ language }) => {
    const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));
    const [board, setBoard] = useState<(string | null)[][]>(initialBoard);
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const { win, draw, lose ,gameStats,user} = useUser(); // Destructure win, draw, and lose from the context
    
    const hasGameEnded = useRef(false); 
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

    useEffect(() => {
        // Handle game results
        if (winner || isTie) { // ตรวจสอบว่าผลเกมจบ
            if (!hasGameEnded.current) { // ถ้ายังไม่เคยจัดการผลเกม
                if (winner) {
                    if (winner === 'X') {
                        win(); 

                        notification.open({
                            message: "ผู้ชนะ!",
                            description: (
                              <div style={{ padding: '10px' }}> {/* กำหนด padding ที่นี่ */}
                                {`เหลือเชื่อ! คุณ {user.name} ทำลายสถิติด้วยการชนะต่อเนื่อง {user.maxWinsStreak} ครั้ง!🏆`}
                              </div>
                            ),
                            icon: '🏆',
                            placement: 'top',
                          });
                        
                        
                        // Call win function if player X wins
                        console.log("🚀 ~ Win ameStats:", gameStats)
                    } else {
                        lose();
                        console.log("🚀 ~ Lose gameStats:", gameStats) // Call lose function if player O wins
                    }
                } else if (isTie) {
                    draw();
                    console.log("🚀 ~  Tie gameStats:", gameStats) // Call draw function if it's a tie
                }
                hasGameEnded.current = true; // ตั้งค่าสถานะว่าเกมจบแล้ว
            }
        } else {
            console.log("🚀 ~ gameStats:", gameStats)
            hasGameEnded.current = false; // ถ้ายังไม่มีผู้ชนะหรือเสมอ ให้รีเซ็ตสถานะ
        }

    }, [winner, isTie, win, draw, lose]);

    return (
        <div className="flex items-center w-full justify-center h-full text-gray-10">
            <div className="w-4/5 flex flex-col gap-4 h-full justify-center items-center ">
                <div id="turnPlay" className="flex justify-center items-center mt-2 p-6 text-2xl h-8 w-full text-center">
                {gameStarted && (
  winner ? (
    <p>
      {user && user.name 
        ? TicTacToeLabels[language].winner(winner, user.name) 
        : TicTacToeLabels[language].winner(winner)}
    </p>
  ) : isTie ? (
    <p>{TicTacToeLabels[language].tie}</p>
  ) : (
    <p>
      {user && user.name 
        ? TicTacToeLabels[language].playerTurn(isXNext, user.name) 
        : TicTacToeLabels[language].playerTurn(isXNext)}
    </p>
  )
)}

                </div>
                <div className="flex flex-col w-full justify-center h-full items-center ">
                    {board.map((row, rowIndex) => (
                        <Row key={rowIndex} gutter={[16, 16]} className='flex min-h-24 justify-center w-full h-full'>
                            {row.map((cell, colIndex) => (
                                <Col key={colIndex} xs={4} sm={4} md={8} lg={8} className='flex min-h-24 justify-center w-full h-full p-1'>
                                    <Button
                                        className="w-full min-h-24 hover:scale-105 h-full bg-orange-80 disabled:text-gray-10"
                                        type="dashed"
                                        block
                                        onClick={() => handleClick(rowIndex, colIndex)}
                                        disabled={cell !== null || !!winner || !gameStarted}
                                        style={{
                                            fontSize: '3vw',
                                            minWidth: '50px',
                                            minHeight: '50px',
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
                <div className="flex flex-col text-center">
                    <div className='flex mb-4 items-center justify-center gap-2 '>
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
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
