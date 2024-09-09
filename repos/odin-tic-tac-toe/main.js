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
        board[coordinates[0] - 1][coordinates[1] - 1] = playerToken;
    };


    return { generateBoard, getBoard, printBoard, addMoveToBoard };
}();

function Player() {

}

function GameRunner(board) {
    board.generateBoard();
    board.printBoard();
    board.addMoveToBoard('X', [2, 1]);
    board.addMoveToBoard('0', [2, 2]);
    board.addMoveToBoard('X', [1, 1]);
    board.printBoard();
}

GameRunner(gameboard);