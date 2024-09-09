function Player() {

}

function GameRunner() {
    const gameboard = function Gameboard() {
        const board = [];
        const generateBoard = () => {
            board.push([null, null, null]);
            board.push([null, null, null]);
            board.push([null, null, null]);
        };

        const getBoard = () => board;
        const printBoard = () => {
        };

        const addMoveToBoard = (player, row, column) => {
        };


        return { generateBoard, getBoard, printBoard, addMoveToBoard };
    }();

    gameboard.generateBoard();
    console.log(gameboard.getBoard());

}

GameRunner();