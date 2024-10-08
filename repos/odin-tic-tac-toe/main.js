const gameboard = function Gameboard() {
    const board = [];
    let boardStatus = {};
    const generateBoard = () => {
        board.push(['  ', '  ', '  ']);
        board.push(['  ', '  ', '  ']);
        board.push(['  ', '  ', '  ']);
    };

    const reset = () => {
        board.splice(0, board.length);
        boardStatus = {};
    }

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

    const addOrChangeBoardStatus = (objectToUpdate) => {
        objectKey = Object.keys(objectToUpdate)[0];
        boardStatus[objectKey] = objectToUpdate[objectKey];
    }

    const addMoveToBoard = (playerToken, coordinates) => {
        let rowIndex = coordinates.row - 1;
        let colIndex = coordinates.column - 1;
        let boardSpace = board[rowIndex][colIndex];
        let isValidMove = false;

        if (boardSpace.trim().length === 0) {
            board[rowIndex][colIndex] = playerToken;
            isValidMove = true;
        }

        addOrChangeBoardStatus({ recentMoveIsValid: isValidMove });
    };

    const refreshBoardStatus = (coordinates) => {
        let rowIndex = coordinates.row - 1;
        let colIndex = coordinates.column - 1;
        let winningPlayer = '';

        // Check if game board is full
        const gameBoardFull = board.flat().filter((boardItem) => {
            return boardItem.trim().length !== 0;
        }).length === 9;
        addOrChangeBoardStatus({ isFull: gameBoardFull });

        // Check rows
        currentRow = board[rowIndex];
        const rowWin = (new Set(currentRow).size === 1);
        winningPlayer = rowWin ? currentRow[0] : winningPlayer;

        // Check columns
        let currentColumn = [];
        board.forEach((boardRow) => {
            currentColumn.push(boardRow[colIndex]);
        });
        const columnWin = (new Set(currentColumn).size === 1);
        winningPlayer = columnWin ? currentColumn[0] : winningPlayer;

        // Check diagonals
        const regularDiagonalSet = new Set([board[0][0], board[1][1], board[2][2]]);
        const regularDiagonalWin = regularDiagonalSet.size === 1 && !regularDiagonalSet.has('  ');
        winningPlayer = regularDiagonalWin ? Array.from(regularDiagonalSet)[0] : winningPlayer;

        const antiDiagonalSet = new Set([board[2][0], board[1][1], board[0][2]]);
        const antiDiagonalWin = antiDiagonalSet.size === 1 && !antiDiagonalSet.has('  ');
        winningPlayer = antiDiagonalWin ? Array.from(antiDiagonalSet)[0] : winningPlayer;
        const winStatus = rowWin || columnWin || regularDiagonalWin || antiDiagonalWin;

        addOrChangeBoardStatus({ hasWinner: winStatus });
        addOrChangeBoardStatus({ winner: winningPlayer });
        addOrChangeBoardStatus({ isTie: !winStatus && gameBoardFull });
    };


    return { generateBoard, reset, getStatus, getBoard, printBoard, addMoveToBoard, refreshBoardStatus };
}();

const screenController = function ScreenController() {
    const boardNodes = document.querySelectorAll('.board button');
    const startGameDialog = document.querySelector('#startScreen');
    const startGameButton = document.querySelector('#startGameButton');
    const firstPlayerName = startGameDialog.querySelector('#firstPlayer');
    const secondPlayerName = startGameDialog.querySelector('#secondPlayer');

    startGameButton.addEventListener('click', (e) => {
        e.preventDefault();
        startGame([firstPlayerName.value, secondPlayerName.value]);
        startGameDialog.close();
    });

    const updateBoardDisplay = (boardArray) => {
        const flatBoard = boardArray.flat();
        if (flatBoard.length === boardNodes.length) {
            boardNodes.forEach((node, index) => {
                node.innerText = flatBoard[index];
            });
        }
    };

    const lockBoard = () => {
        boardNodes.forEach((node) => {
            node.removeEventListener('click', handleBoardClick);
            node.classList.add('locked');
        })
    };

    const showStartGameDialog = () => {
        startGameDialog.showModal();
    };

    const populateEndGameDialog = (message) => {
        const endScreenDialog = document.querySelector('#endScreen');
        const userMessageDisplay = document.querySelector('#endScreen p');
        const cancelButton = document.querySelector('#cancelButton');
        const newGameButton = document.querySelector('#newGameButton');

        userMessageDisplay.innerText = message;

        cancelButton.addEventListener('click', () => {
            startGameDialog.showModal();
            firstPlayerName.value = '';
            secondPlayerName.value = '';
        });

        newGameButton.addEventListener('click', (e) => {
            e.preventDefault();
            endScreenDialog.close();
            startGame([firstPlayerName.value, secondPlayerName.value]);
        });
        endScreenDialog.showModal();
    }

    const startGame = (playerNames) => {
        gameRunner.fullReset();
        gameRunner.setupGame(playerNames);
    }

    const initializeBoardEventHandlers = () => {
        boardNodes.forEach((node) => {
            node.addEventListener('click', handleBoardClick);
        })
    };

    const handleBoardClick = (e) => {
        const node = e.currentTarget;
        const activePlayerToken = playerController.getActivePlayer().getToken();

        const moveCoordinates = { row: node.dataset.row, column: node.dataset.column };
        gameboard.addMoveToBoard(activePlayerToken, moveCoordinates);
        const boardStatus = gameboard.getStatus();

        if (boardStatus.recentMoveIsValid) {
            gameboard.refreshBoardStatus(moveCoordinates);
            screenController.updateBoardDisplay(gameboard.getBoard());
            playerController.toggleActivePlayer();

            if (boardStatus.hasWinner || boardStatus.isFull || boardStatus.isTie) {
                lockBoard();

                if (boardStatus.isTie) {
                    populateEndGameDialog('It\'s a tie!')
                } else {
                    const allPlayers = playerController.getAllPlayers();
                    const winningPlayer = allPlayers.filter((player) => {
                        return player.getToken() === boardStatus.winner;
                    })[0];
                    populateEndGameDialog(winningPlayer.getName() + ' wins!');
                }
            }
        }
    };

    const reset = () => {
        boardNodes.forEach((node) => {
            node.innerText = '';
            node.classList.remove('locked');
        });
    };

    return { updateBoardDisplay, showStartGameDialog, initializeBoardEventHandlers, reset };
}();

const playerController = function PlayerController() {
    const allPlayers = [];
    let activePlayer;

    const generatePlayer = (token, name) => {
        const generatedPlayer = new Player(token, name);
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
    const getAllPlayers = () => allPlayers;

    const reset = () => {
        allPlayers.splice(0, allPlayers.length);
        activePlayer = null;
    };

    return { generatePlayer, toggleActivePlayer, getActivePlayer, getAllPlayers, reset };
}();

function Player(token, name) {
    let playerToken = token;
    let playerName = name;
    const getToken = () => playerToken;
    const getName = () => playerName;

    return { getToken, getName };
}

const gameRunner = function GameRunner() {
    const setupGame = (playerNames) => {
        if (playerNames && playerNames.length) {
            playerController.generatePlayer('X', playerNames[0]);
            playerController.generatePlayer('O', playerNames[1]);
        } else {
            playerController.generatePlayer('X', 'X');
            playerController.generatePlayer('O', 'O');
        }
        gameboard.generateBoard();
        screenController.initializeBoardEventHandlers();
    };

    const fullReset = () => {
        playerController.reset();
        gameboard.reset();
        screenController.reset();
    };

    return { setupGame, fullReset };
}();

screenController.showStartGameDialog();