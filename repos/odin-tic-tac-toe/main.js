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
        board[coordinates.row - 1][coordinates.column - 1] = playerToken;
    };


    return { generateBoard, getBoard, printBoard, addMoveToBoard };
}();

function Player(initialToken) {
    let token = initialToken;
    let spaces = [];

    const getToken = () => token;
    const setToken = (newToken) => {
        token = newToken;
    };

    const addMoveToSpacesList = (moveCoordinates) => {
        spaces.push(moveCoordinates);
    };

    return { getToken, setToken, addMoveToSpacesList };
}

function GameRunner(board) {
    board.generateBoard();
    board.printBoard();
    board.addMoveToBoard('X', { row: 2, column: 1 });
    board.addMoveToBoard('0', { row: 2, column: 2 });
    board.addMoveToBoard('X', { row: 1, column: 1 });
    board.printBoard();
}

GameRunner(gameboard);