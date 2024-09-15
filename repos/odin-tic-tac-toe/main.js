const gameboard = function Gameboard() {
    const board = [];
    let boardStatus = {};
    const generateBoard = () => {
        board.push(['  ', '  ', '  ']);
        board.push(['  ', '  ', '  ']);
        board.push(['  ', '  ', '  ']);
    };

    const getStatus = () => boardStatus;
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
            checkGameEnd(coordinates);
        }
    };

    const checkGameEnd = (coordinates) => {

        // Check if game board is full
        const gameBoardFull = board.flat().filter((boardItem) => {
            return boardItem.trim().length !== 0;
        }).length === 9;

        // Check rows
        currentRow = board[coordinates.row - 1];
        const rowWin = (new Set(currentRow).size === 1);

        // Check columns
        let currentColumn = [];
        board.forEach((boardRow) => {
            currentColumn.push(boardRow[coordinates.column - 1]);
        });
        const columnWin = (new Set(currentColumn).size === 1);

        // Check diagonals
        const regularDiagonalWin = new Set([board[0][0], board[1][1], board[2][2]]).size === 1;
        const antiDiagonalWin = new Set([board[3][1], board[2][2], board[1][3]]).size === 1;


        const winStatus = rowWin || columnWin || regularDiagonalWin || antiDiagonalWin;
        boardStatus = { hasWinner: winStatus, isFull: gameBoardFull };
    };


    return { generateBoard, getStatus, getBoard, printBoard, addMoveToBoard };
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

function togglePlayers(players) {
    players.forEach((player) => {
        player.toggleActive();
    });
}

function GameRunner(board) {
    board.generateBoard();
    const player1 = Player('X', true);
    const player2 = Player('O', false);

    while (!(board.getStatus().hasWinner) && !(board.getStatus().isFull)) {
        let playerSpot = prompt('Which spot (comma-delimited): ');

        if (!playerSpot) {
            break;
        }

        playerSpot = playerSpot.split(',', 2);
        const activePlayer = player1.getActive() ? player1 : player2;
        board.addMoveToBoard(activePlayer.getToken(), { row: playerSpot[0], column: playerSpot[1] });
        togglePlayers([player1, player2]);
        board.printBoard();
    }
}

GameRunner(gameboard);