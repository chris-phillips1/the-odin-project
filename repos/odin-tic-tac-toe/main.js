const gameboard = function Gameboard() {
    const board = [];
    const generateBoard = () => {
        board.push(['  ', '  ', '  ']);
        board.push(['  ', '  ', '  ']);
        board.push(['  ', '  ', '  ']);
    };

    const getBoard = () => board;
    const printBoard = () => {
        let boardString = 'Board\n';
        board.forEach((boardRow, index) => {
            boardString += boardRow.join(' || ') + '\n';
            if (index < boardRow.length - 1) {
                boardString += '= = = = =\n';
            }
        });
        console.log(boardString);
    };

    const addMoveToBoard = (playerToken, coordinates) => {
        let boardSpace = board[coordinates.row - 1][coordinates.column - 1];
        if (boardSpace.trim().length === 0) {
            board[coordinates.row - 1][coordinates.column - 1] = playerToken;
            checkWin(coordinates);
        }
    };

    const checkWin = (coordinates) => {
        // return { hasWinner: (board[1][1] === 'X') };
    };


    return { generateBoard, getBoard, printBoard, addMoveToBoard, checkWin };
}();

function Player(playerToken, isActive) {
    let token = playerToken;
    let active = isActive;

    const getToken = () => token;
    const setToken = (newToken) => {
        token = newToken;
    };

    const getActive = () => active;
    const toggleActive = () => {
        active = !active;
    }

    return { getToken, setToken, getActive, toggleActive };
}

function GameRunner(board) {
    board.generateBoard();
    const player1 = Player('X', true);
    const player2 = Player('O', false);

    let boardStatus = board.checkWin();

    while (!(boardStatus.hasWinner)) {
        let playerSpot = prompt('Which spot (comma-delimited): ');

        if (playerSpot) {
            playerSpot = playerSpot.split(',', 2);
        }

        const activePlayer = player1.getActive() ? player1 : player2;
        board.addMoveToBoard(activePlayer.getToken(), { row: playerSpot[0], column: playerSpot[1] });
        player1.toggleActive();
        player2.toggleActive();
        boardStatus = board.checkWin();
        board.printBoard();
    }
}

GameRunner(gameboard);