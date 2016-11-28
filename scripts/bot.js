class Bot {
    constructor(botSymbol, playerSymbol) {
        this.botSymbol = botSymbol;
        this.playerSymbol = playerSymbol;
    }

    makeMove(board) {
        let winningMove = checkForWinningMove(board, this.playerSymbol, this.botSymbol);
        if (winningMove.row != -1 && winningMove.col != -1) {
            return winningMove;
        }

        let blockMove = checkForDanger(board, this.playerSymbol, this.botSymbol);
        if (blockMove.row != -1 && blockMove.col != -1) {
            return blockMove;
        }

        let elements = [];
        for (let i = 0; i < 3; i++) {
            let arr = board[i].map((x,index) => {
                return {row: i, col: index, value: x};
            });

            Array.prototype.push.apply(elements, arr);
        }

        let emptyCells = elements.filter(x => x.value === ' ');
        let rand = Math.floor(Math.random() * emptyCells.length);

        return { row: emptyCells[rand].row, col: emptyCells[rand].col }

        function checkForDanger(board, playerSymbol, botSymbol) {
            //check rows
            for (let i = 0; i < 3; i++) {
                if (board[i].some(x => x == botSymbol)) {
                    continue;
                }

                if (board[i].filter(x => x == playerSymbol).length == 2) {
                    return {row:i, col: board[i].indexOf(' ')}
                }
            }

            //check cols
            let possible = true;
            for (let j = 0; j < 3; j++) {
                let playerSymbolsCount = 0;
                for (let i = 0; i < 3; i++) {
                    if (board[i][j] == botSymbol) {
                        possible = false;
                        break;
                    }
                    else if (board[i][j] == playerSymbol) {
                        playerSymbolsCount++;
                    }
                }

                if (!possible) {
                    possible = true;
                    continue;
                }

                if (playerSymbolsCount == 2) {
                    for (let i = 0; i < 3; i++) {
                        if (board[i][j] == ' ') {
                            return {row: i, col: j};
                        }
                    }
                }
            }

            //check the diagonals
            let playerSymbolsCount = 0;
            for (let i = 0, j = 2; i < 3; i++, j--) {
                if (board[i][j] == botSymbol) {
                    break;
                }
                else if (board[i][j] == playerSymbol) {
                    playerSymbolsCount++;
                }
            }

            if (playerSymbolsCount == 2) {
                for (let i = 0, j = 2; i < 3; i++, j--) {
                    if (board[i][j] == ' ') {
                        return {row: i, col: j};
                    }
                }
            }

            playerSymbolsCount = 0;
            for (let i = 0, j = 0; i < 3; i++, j++) {
                if (board[i][j] == botSymbol) {
                    break;
                }
                else if (board[i][j] == playerSymbol) {
                    playerSymbolsCount++;
                }
            }

            if (playerSymbolsCount == 2) {
                for (let i = 0, j = 0; i < 3; i++, j++) {
                    if (board[i][j] == ' ') {
                        return {row: i, col: j};
                    }
                }
            }

            return { row: -1, col: -1};
        }

        function checkForWinningMove(board, playerSymbol, botSymbol) {
            //check rows
            for (let i = 0; i < 3; i++) {
                if (board[i].some(x => x == playerSymbol)) {
                    continue;
                }

                if (board[i].filter(x => x == botSymbol).length == 2) {
                    return {row:i, col: board[i].indexOf(' ')}
                }
            }

            //check cols
            let possible = true;
            for (let j = 0; j < 3; j++) {
                let botSymbolsCount = 0;
                for (let i = 0; i < 3; i++) {
                    if (board[i][j] == playerSymbol) {
                        possible = false;
                        break;
                    }
                    else if (board[i][j] == botSymbol) {
                        botSymbolsCount++;
                    }
                }

                if (!possible) {
                    possible = true;
                    continue;
                }

                if (botSymbolsCount == 2) {
                    for (let i = 0; i < 3; i++) {
                        if (board[i][j] == ' ') {
                            return {row: i, col: j};
                        }
                    }
                }
            }

            //check the diagonals
            let botSymbolsCount = 0;
            for (let i = 0, j = 2; i < 3; i++, j--) {
                if (board[i][j] == playerSymbol) {
                    break;
                }
                else if (board[i][j] == botSymbol) {
                    botSymbolsCount++;
                }
            }

            if (botSymbolsCount == 2) {
                for (let i = 0, j = 2; i < 3; i++, j--) {
                    if (board[i][j] == ' ') {
                        return {row: i, col: j};
                    }
                }
            }

            botSymbolsCount = 0;
            for (let i = 0, j = 0; i < 3; i++, j++) {
                if (board[i][j] == playerSymbol) {
                    break;
                }
                else if (board[i][j] == botSymbol) {
                    botSymbolsCount++;
                }
            }

            if (botSymbolsCount == 2) {
                for (let i = 0, j = 0; i < 3; i++, j++) {
                    if (board[i][j] == ' ') {
                        return {row: i, col: j};
                    }
                }
            }

            return { row: -1, col: -1};
        }
    }
}