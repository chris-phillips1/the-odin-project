const gameboard = function Gameboard() {
    const board = [];
    let boardStatus = { hasWinner: false };
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
            checkWin(coordinates);
        }
    };

    const checkWin = (coordinates) => {
        let winStatus = false;

        boardStatus.hasWinner = winStatus;
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

    let boardStatus = board.getStatus();

    while (!(boardStatus.hasWinner)) {
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