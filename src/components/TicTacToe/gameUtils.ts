export const makeRandomMove = (newBoard: (string | null)[][]) => {
    const availableMoves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!newBoard[i][j]) availableMoves.push({ i, j });
        }
    }

    if (availableMoves.length === 0) {
        return newBoard;
    }

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return newBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
            rIdx === randomMove.i && cIdx === randomMove.j ? 'O' : cell
        )
    );
};

export const makeBlockingMove = (newBoard: (string | null)[][]) => {
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

export const findBestMove = (newBoard: (string | null)[][]) => {
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

export const minimax = (newBoard: (string | null)[][], depth: number, isMaximizing: boolean) => {
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

export const calculateWinner = (squares: (string | null)[][]): string | null => {
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

export const isBoardFull = (squares: (string | null)[][]): boolean => {
    return squares.every(row => row.every(cell => cell !== null));
};
