function startApp() {
    showView('chooseView');

    let symbol;
    $('#chooseView').find('div').click(function () {
        symbol = $(this).text();
        showView('gameView');
        let bot = new Bot(symbol == 'x' ? 'o' : 'x', symbol);
        let board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];
        attachClickSquares(symbol, board, bot);
    });

    function endGame(gameover) {
        $('#gameView').append($('<div id="result">').text('Winner: ' + gameover.winner));
        $('.square div').unbind();
    }

    function attachClickSquares(symbol, board, bot) {
        $('.square div').click(function () {
            if (!$(this).hasClass('x') && !$(this).hasClass('o')) {
                $(this).addClass(symbol);
                let coords = getCoordinates(this);
                board[coords.row][coords.col] = symbol;
                let gameOver = checkForCompleteLine(board, symbol, bot.botSymbol);
                if (gameOver.line) {
                    showWinningLine(gameOver);
                    endGame(gameOver);
                }
                else {
                    let botMoveCoords = bot.makeMove(board);
                    board[botMoveCoords.row][botMoveCoords.col] = bot.botSymbol;
                    let selector = getSelectorFromCoordinates(botMoveCoords);
                    $(selector).addClass(bot.botSymbol);
                    gameOver = checkForCompleteLine(board, symbol, bot.botSymbol);
                    if (gameOver.line) {
                        showWinningLine(gameOver)
                        endGame(gameOver);
                    }
                }
            }
        });
    }

    function showWinningLine(gameOver) {
        let color = gameOver.winner == 'player' ? symbol == 'x' ? 'blue' : 'red' : symbol == 'o' ? 'blue' : 'red';
        $('#line').css('background-color', color);
        let row = gameOver.row;
        let col = gameOver.col;
        if (row === -1) {
            if (col === 0) {
                $('#line').css('left', '31%');
            }
            else if (col === 2) {
                $('#line').css('left', '67%');
            }
        }
        else if (col === -1) {
            $('#line').css('transform', 'rotate(90deg)');
            if (row === 0) {
                $('#line').css('top', '-19%');
            }
            else if (row === 2) {
                $('#line').css('top', '36%');
            }
        }
        else if (row === 0 && col === 1) {
            $('#line').css('transform', 'rotate(-45deg)');
        }
        else if (row === 1 && col === 0) {
            $('#line').css('transform','rotate(45deg)');
        }
    }

    function getSelectorFromCoordinates(coords) {
        let selector = `#${coords.row}${coords.col}`;

        return selector;
    }

    function getCoordinates(div) {
        let id = $(div).attr('id');
        let coordinates = {row: Number(id[0]), col: Number(id[1])}

        return coordinates;
    }

    function checkForCompleteLine(board, playerSymbol, botSymbol) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == playerSymbol && board[i][1] == playerSymbol && board[i][2] == playerSymbol) {
                return {line: true, row: i, col: -1, winner: "player"}
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][i] == playerSymbol && board[1][i] == playerSymbol && board[2][i] == playerSymbol) {
                return {line: true, row: -1, col: i, winner: "player"}
            }
        }

        if (board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol) {
            return {line: true, row: 0, col: 1, winner: "player"}
        }

        if (board[0][2] == playerSymbol && board[1][1] == playerSymbol && board[2][0] == playerSymbol) {
            return {line: true, row: 1, col: 0, winner: "player"}
        }

        //check if bot wins
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == botSymbol && board[i][1] == botSymbol && board[i][2] == botSymbol) {
                return {line: true, row: i, col: -1, winner: "bot"}
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][i] == botSymbol && board[1][i] == botSymbol && board[2][i] == botSymbol) {
                return {line: true, row: -1, col: i, winner: "bot"}
            }
        }

        if (board[0][0] == botSymbol && board[1][1] == botSymbol && board[2][2] == botSymbol) {
            return {line: true, row: 0, col: 1, winner: "bot"}
        }

        if (board[0][2] == botSymbol && board[1][1] == botSymbol && board[2][0] == botSymbol) {
            return {line: true, row: 1, col: 0, winner: "bot"}
        }

        return {line: false};
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }
}