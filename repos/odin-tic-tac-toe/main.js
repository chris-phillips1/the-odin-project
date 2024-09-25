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
            return true;
        }

        return false;
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
        const regularDiagonalSet = new Set([board[0][0], board[1][1], board[2][2]]);
        const antiDiagonalSet = new Set([board[2][0], board[2][2], board[0][2]]);

        const antiDiagonalWin = antiDiagonalSet.size === 1 && !antiDiagonalSet.has('  ');
        const regularDiagonalWin = regularDiagonalSet.size === 1 && !regularDiagonalSet.has('  ');


        const winStatus = rowWin || columnWin || regularDiagonalWin || antiDiagonalWin;
        boardStatus = { hasWinner: winStatus, isFull: gameBoardFull, isTie: !winStatus && gameBoardFull };
    };


    return { generateBoard, getStatus, getBoard, printBoard, addMoveToBoard };
}();

const screenController = function ScreenController() {
    const boardNodes = document.querySelectorAll('.board button');

    const updateBoardDisplay = (boardArray) => {
        const flatBoard = boardArray.flat();
        if (flatBoard.length === boardNodes.length) {
            boardNodes.forEach((node, index) => {
                node.innerText = flatBoard[index];
            });
        }
    };

    const initializeBoardEventHandlers = () => {
        boardNodes.forEach((node) => {
            node.addEventListener('click', () => {
                node.innerText = playerController.getActivePlayer().getToken();
            });
        })
    };

    return { updateBoardDisplay, initializeBoardEventHandlers };
}();

const playerController = function PlayerController() {
    const allPlayers = [];
    let activePlayer;

    const generatePlayer = (token) => {
        const generatedPlayer = new Player(token);
        activePlayer = activePlayer ? activePlayer : generatedPlayer;

        allPlayers.push(generatedPlayer);
        return generatedPlayer;
    };

    const toggleActivePlayer = () => {
        if (allPlayers.length === 2) {
            activePlayer = allPlayers.filter((player) => {
                return player.getToken() !== activePlayer.getToken();
            })[0];
        }
    };

    const getActivePlayer = () => activePlayer;

    return { generatePlayer, toggleActivePlayer, getActivePlayer };
}();

function Player(token) {
    let playerToken = token;
    const getToken = () => playerToken;

    return { getToken };
}

function GameRunner() {
    playerController.generatePlayer('X');
    playerController.generatePlayer('O');
    gameboard.generateBoard();
    screenController.initializeBoardEventHandlers();
    screenController.updateBoardDisplay(gameboard.getBoard());

    // While the board is still playable
    // while (!(board.getStatus().hasWinner) && !(board.getStatus().isFull)) {
    // Change active player
    // Update active player node
}

GameRunner();